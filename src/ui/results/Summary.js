import React from "react";
import PropTypes from "prop-types";

import { Tracking } from "sajari";

import { Pipeline, resultsEvent, errorEvent, Values } from "../../controllers";

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
      tracking: PropTypes.instanceOf(Tracking).isRequired,
      time: PropTypes.string,
      totalResults: PropTypes.string,
      error: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.state = { error: null, results: null, responseValues: null };
  }

  componentDidMount() {
    const { pipeline } = this.props;
    this.setState({
      error: pipeline.getError(),
      results: pipeline.getResults(),
      responseValues: pipeline.getResponseValues()
    });
    this.removeErrorListener = pipeline.listen(errorEvent, this.errorChanged);
    this.removeResultsListener = pipeline.listen(
      resultsEvent,
      this.resultsChanged
    );
  }

  componentWillUnmount() {
    this.removeErrorListener();
    this.removeResultsListener();
  }

  errorChanged = error => {
    this.setState({ error });
  };

  resultsChanged = (results, responseValues) => {
    this.setState({
      results,
      responseValues,
      error: null
    });
  };

  runOverride = event => {
    event.preventDefault();
    this.props.values.set({ q: this.values.get()["q"], "q.override": "true" });
    this.props.pipeline.search(this.props.values, this.props.tracking);
  };

  render() {
    const { values, pipeline, tracking } = this.props;
    const { error, results, responseValues = {} } = this.state;
    const queryValues = values.get() || {};

    if (error || !results) {
      return null;
    }

    const text = responseValues["q"] || queryValues["q"];
    const page = parseInt(queryValues.page, 10);
    const pageNumber = page && page > 1 ? `Page ${page} of ` : "";
    const override =
      responseValues["q"] &&
      responseValues["q"].toLowerCase() !== queryValues["q"].toLowerCase()
        ? <span className="sj-result-summary-autocomplete-override">
            {`search instead for `}
            <a onClick={this.runOverride} href="">
              {" "}{queryValues["q"]}{" "}
            </a>
          </span>
        : null;

    return (
      <div className="sj-result-summary">
        <span className="sj-result-summary-text">
          {`${pageNumber}${results.totalResults} results for `}
          "<strong>{text}</strong>"{" "}
        </span>
        <span className="sj-result-summary-query-`time`">{`(${results.time}) `}</span>
        {override}
      </div>
    );
  }
}

export default Summary;
