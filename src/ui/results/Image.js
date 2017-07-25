import React from "react";
import PropTypes from "prop-types";

class Image extends React.Component {
  /**
   * propTypes
   * @property {string} url URL of the image.
   * @property {string} title Alt text of the image.
   */
  static get propTypes() {
    return {
      url: PropTypes.string.isRequired,
      title: PropTypes.string
    };
  }

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
