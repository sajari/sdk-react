import React from "react";
import PropTypes from "prop-types";

import { Pipeline, responseUpdatedEvent } from "../../controllers";

class Response extends React.Component {
  /**
   * propTypes
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Object} [children] Child components to render when result is received.
   */
  static get propTypes() {
    return {
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      children: PropTypes.node
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

  render() {
    const { children, pipeline, ...rest } = this.props;
    const { response } = this.state;

    if (response.isEmpty()) {
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
