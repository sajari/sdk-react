import React from "react";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  render() {
    const onError = () => this.setState({ show: false });
    return (
      <img
        className="sj-result-image"
        style={this.state.show ? undefined : { display: "none" }}
        onError={onError}
        src={this.props.url}
        alt={this.props.title}
      />
    );
  }
}

export default Image;
