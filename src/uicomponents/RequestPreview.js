import React from "react";

import RequestStore from "../stores/RequestStore.js";

class RequestPreviewRenderer extends React.Component {
  render() {
    return (
      <div>
        <textarea readOnly value={JSON.stringify(this.props.request, null, "\t")} style={{width: "100%", height: 500}}></textarea>
      </div>
    );
  }
}

export default class RequestPreview extends React.Component {
  static propTypes = {
    namespace: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    this._requestChanged = this._requestChanged.bind(this);
    const ns = props.namespace ? props.namespace : "default";
    this.state = {
      namespace: ns,
      request: RequestStore.getRequest(ns),
    };
  }

  _requestChanged() {
    this.setState({
      namespace: this.state.namespace,
      request: RequestStore.getRequest(this.state.namespace),
    });
  }

  componentDidMount() {
    RequestStore.addChangeListener(this._requestChanged);
    this.setState({
      namespace: this.state.namespace,
      request: RequestStore.getRequest(this.state.namespace),
    });
  }

  componentWillUnmount() {
    RequestStore.removeChangeListener(this._requestChanged);
  }

  render() {
    return (
      <RequestPreviewRenderer request={this.state.request} />
    );
  }
}
