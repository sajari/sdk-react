import React from "react";
import PropTypes from "prop-types";

import { Pipeline, resultsEvent, errorEvent } from "../../controllers";

class Response extends React.Component {
  /**
   * propTypes
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Object} [children] Child components to render when result is received.
   */
  static get propTypes() {
    return {
      pipeline: PropTypes.instanceOf(Pipeline),
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
    this.setState({ results: this.props.pipeline.getResults() || {} });
  };

  render() {
    const { children, pipeline, ...rest } = this.props;
    const { results } = this.state;

    if (!results.time && !pipeline.getError()) {
      return null;
    }

    return (
      <div {...rest}>
        {children}
      </div>
    );
  }
}

export default Response;
