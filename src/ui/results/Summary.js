import React from "react";
import PropTypes from "prop-types";

import {
  Pipeline,
  Tracking,
  responseUpdatedEvent,
  Values
} from "../../controllers";

class Summary extends React.Component {
  /**
   * propTypes
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Values} values Values object.
   * @property {Sajari.Tracking} filter Tracking object from sajari package.
   * @property {string} [time] Query time. Usually supplied by Response.
   * @property {string} [totalResults] Number of results. Usually supplied by Response.
   * @property {string} [error] Error from search. Usually supplied by Response.
   */
  static get propTypes() {
    return {
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      values: PropTypes.instanceOf(Values).isRequired,
      tracking: PropTypes.instanceOf(Tracking)
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
    this.props.pipeline.search(this.props.values, this.props.tracking);
  };

  render() {
    const { values, pipeline, tracking } = this.props;
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

    const resp = response.getResponse();
    return (
      <div className="sj-result-summary">
        <span className="sj-result-summary-text">
          {`${pageNumber}${resp.totalResults} results for `}
          "<strong>{text}</strong>"{" "}
        </span>
        <span className="sj-result-summary-query-time">{`(${resp.time}) `}</span>
        {override}
      </div>
    );
  }
}

export default Summary;
