import React from "react";
import PropTypes from "prop-types";

import { Pipeline, responseUpdatedEvent, Values } from "../../controllers";

class Summary extends React.Component {
  /**
   * propTypes
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Values} values Values object.
   */
  static get propTypes() {
    return {
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      values: PropTypes.instanceOf(Values).isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = { response: props.pipeline.getResponse() };
  }

  componentDidMount() {
    this.removeResponseListener = this.props.pipeline.listen(
      responseUpdatedEvent,
      this.responseUpdated
    );
  }

  componentWillUnmount() {
    this.removeResponseListener();
  }

  responseUpdated = response => {
    this.setState({ response });
  };

  handleOverride = event => {
    event.preventDefault();
    this.props.values.set({
      q: this.props.values.get()["q"],
      "q.override": "true"
    });
    this.props.pipeline.search(this.props.values.get());
  };

  render() {
    const { response } = this.state;

    if (response.isEmpty() || response.isError()) {
      return null;
    }

    const responseValues = response.getValues();
    const queryValues = response.getQueryValues();

    const text = responseValues["q"] || queryValues["q"];
    const page = parseInt(queryValues.page, 10);
    const pageNumber = page && page > 1 ? `Page ${page} of ` : "";
    const override =
      responseValues["q"] &&
      responseValues["q"].toLowerCase() !== queryValues["q"].toLowerCase()
        ? <span className="sj-result-summary-autocomplete-override">
            {`search instead for `}
            <a onClick={this.handleOverride} href="">
              {" "}{queryValues["q"]}{" "}
            </a>
          </span>
        : null;

    return (
      <div className="sj-result-summary">
        <span className="sj-result-summary-text">
          {`${pageNumber}${response.getTotalResults()} results for `}
          "<strong>{text}</strong>"{" "}
        </span>
        <span className="sj-result-summary-query-time">{`(${response.getTime()}) `}</span>
        {override}
      </div>
    );
  }
}

export default Summary;
