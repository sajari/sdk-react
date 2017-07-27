import React from "react";
import PropTypes from "prop-types";

import { Pipeline, errorEvent, resultsEvent } from "../../controllers";

import { Result } from "./";

class Results extends React.Component {
  /**
   * propTypes
   * @property {Object[]} [results] Results data.
   * @property {string} [error] Error from search.
   * @property {Pipeline} pipeline Pipeline object.
   */
  static get propTypes() {
    return {
      results: PropTypes.arrayOf(PropTypes.object),
      error: PropTypes.string,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = { error: null, results: null, responseValues: null };
  }

  componentWillMount() {
    const { pipeline } = this.props;
    this.setState({
      error: pipeline.getError(),
      results: pipeline.getResults(),
      responseValues: pipeline.getResponseValues()
    });
  }

  componentDidMount() {
    const { pipeline } = this.props;
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

  onResultClicked = url => {
    this.props.pipeline.emitResultClicked(url);
  };

  render() {
    const { pipeline } = this.props;
    const { error, results } = this.state;

    if (!results && !error) {
      return null;
    }
    return (
      <ResultsRenderer
        error={error}
        results={results}
        resultClicked={this.onResultClicked}
        ResultRenderer={this.props.ResultRenderer}
      />
    );
  }
}

Results.defaultProps = {
  ResultRenderer: Result
};

const ResultsRenderer = ({ error, results, resultClicked, ResultRenderer }) => {
  if (error) {
    return (
      <div className="sj-result-error">An error occured while searching.</div>
    );
  }

  if (!results) {
    return <div className="sj-result-list" />;
  }

  const renderedResults = results.results.map((r, index) => {
    const token = r.tokens && r.tokens.click && r.tokens.click.token;

    return (
      <ResultRenderer
        key={r.values._id || "" + index + r.values.url}
        values={r.values}
        token={token}
        resultClicked={resultClicked}
      />
    );
  });
  return (
    <div className="sj-result-list">
      {renderedResults}
    </div>
  );
};

export default Results;
