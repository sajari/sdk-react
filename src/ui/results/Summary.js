import React from "react";
import PropTypes from "prop-types";

import { Pipeline, responseUpdatedEvent, Values } from "../../controllers";

const formatQueryTime = time => {
  if (!time) {
    return "";
  }

  const splitNum = time.split(".");
  if (splitNum.length === 1 || parseInt(splitNum[1]) === 0) {
    return parseInt(splitNum[0]) + "s";
  }

  const numZeros = /0*/.exec(splitNum[1])[0].length;
  const fractional = splitNum[1].slice(0, numZeros + 1);

  return splitNum[0] + "." + fractional + "s";
};

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

    const responseTime = formatQueryTime(response.getTime());

    return (
      <div className="sj-result-summary">
        <span className="sj-result-summary-text">
          {`${pageNumber}${response.getTotalResults().toLocaleString()} results for `}
          "<strong>{text}</strong>"{" "}
        </span>
        <span className="sj-result-summary-query-time">{`(${
          responseTime
        }) `}</span>
        {override}
      </div>
    );
  }
}

export { formatQueryTime };
export default Summary;
