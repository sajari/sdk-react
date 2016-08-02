import React from "react";

import Body from "../components/Body.js";

export default class BodyText extends React.Component {
  static propTypes = {
    body: React.PropTypes.string,
    useEmptyBody: React.PropTypes.bool,
    namespace: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {text: props.body ? props.body : ""};
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(evt) {
    this.setState({text: evt.target.value});
  }

  render() {
    const {namespace, ...others} = this.props;
    const body = this.state.text || this.props.useEmptyBody ? (
      <Body
         namespace={namespace}
         body={this.state.text}
      />
    ) : null;
    return (
      <div>
        <input
           {...others}
           type="text"
           value={this.state.text}
           onChange={this.onInputChange}
           />
        {body}
      </div>
    );
  }
}
