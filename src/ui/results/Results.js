import React from "react";
import PropTypes from "prop-types";

import { Pipeline, responseUpdatedEvent, Response } from "../../controllers";

import { Result } from "./";

class Results extends React.Component {
  /**
   * propTypes
   * @property {Pipeline} pipeline Pipeline object.
   */
  static get propTypes() {
    return {
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      ResultRenderer: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(React.Component)
      ])
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

  handleResultClicked = url => {
    this.props.pipeline.emitResultClicked(url);
  };

  render() {
    const { response } = this.state;

    if (response.isEmpty()) {
      return null;
    }

    return (
      <ResultsRenderer
        response={response}
        resultClicked={this.handleResultClicked}
        ResultRenderer={this.props.ResultRenderer}
      />
    );
  }
}

Results.defaultProps = {
  ResultRenderer: Result
};

const ResultsRenderer = ({ response, resultClicked, ResultRenderer }) => {
  if (response.isError()) {
    if (response.getError().code === 403) {
      return (
        <div className="sj-result-error">
          Authorisation for this request failed. Check your credentials.
        </div>
      );
    }
    return <div className="sj-result-error">{response.getError().message}</div>;
  }

  if (response.isEmpty()) {
    return null;
  }

  const renderedResults = response.getResults().map((r, index) => {
    const token = r.tokens && r.tokens.click && r.tokens.click.token;

    return (
      <ResultRenderer
        key={r.values._id || "" + index + r.values.url}
        values={r.values}
        token={token}
        resultClicked={resultClicked}
        score={r.score}
        indexScore={r.indexScore}
      />
    );
  });
  return (
    <div className="sj-result-list">
      {renderedResults}
    </div>
  );
};

ResultsRenderer.propTypes = {
  response: PropTypes.instanceOf(Response).isRequired,
  resultClicked: PropTypes.func.isRequired,
  ResultRenderer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(React.Component)
  ])
};

export default Results;
