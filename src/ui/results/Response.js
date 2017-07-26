import React from "react";
import PropTypes from "prop-types";

import { Pipeline, resultsEvent, errorEvent } from "../../controllers";

class Response extends React.Component {
  /**
   * propTypes
   * @property {Pipeline} pipeline Pipeline object.
   * @property {React.Component} [Placeholder] Placeholder component to render while empty.
   * @property {Object} [children] Child components to render and inject the response into.
   */
  static get propTypes() {
    return {
      pipeline: PropTypes.instanceOf(Pipeline),
      Placeholder: PropTypes.oneOfType([
        PropTypes.instanceOf(Function),
        PropTypes.instanceOf(React.Component)
      ]),
      children: PropTypes.node
    };
  }

  constructor(props) {
    super(props);
    this.state = { results: props.pipeline.getResults() || {} };
  }

  componentDidMount() {
    this.removeErrorListener = this.props.pipeline.listen(
      errorEvent,
      this.resultsChanged
    );
    this.removeResultsListener = this.props.pipeline.listen(
      resultsEvent,
      this.resultsChanged
    );
  }

  componentWillUnmount() {
    this.removeErrorListener();
    this.removeResultsListener();
  }

  resultsChanged = () => {
    const response = this.props.pipeline.getResults() || {};
    this.setState({ results: response });
  };

  render() {
    const { children, Placeholder, pipeline } = this.props;
    const { results } = this.state;
    const time = results.time;
    const error = pipeline.getError();

    if (!time && !error) {
      return Placeholder ? <Placeholder /> : null;
    }

    const propsForChildren = { ...results, error, pipeline };
    const childrenWithResults = React.Children.map(children, c => {
      if (React.isValidElement(c)) {
        return React.cloneElement(c, propsForChildren);
      }
      return null;
    });

    return (
      <div className="sj-pipeline-response">
        {childrenWithResults}
      </div>
    );
  }
}

export default Response;
