import React from "react";
import PropTypes from "prop-types";

const tokenUrl = "https://www.sajari.com/token/";

class TokenLink extends React.Component {
  /**
   * propTypes
   * @property {function()} resultClicked Function to be called when the result is clicked. Typically for analytics
   * @property {string} token Token to use in click tracking.
   * @property {string} url URL of the result.
   * @property {string} text Text to render.
   * @property {Object} [children] Children to render.
   */
  static get propTypes() {
    return {
      resultClicked: PropTypes.func,
      token: PropTypes.string,
      url: PropTypes.string,
      text: PropTypes.string,
      children: PropTypes.node
    };
  }

  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.click = this.click.bind(this);
  }

  click() {
    this.setState({ clicked: true });
    if (this.props.resultClicked) {
      this.props.resultClicked(this.props.url);
    }
  }

  render() {
    const { token, url, text, children } = this.props;
    const { clicked } = this.state;
    const urlWithToken = clicked && token ? tokenUrl + token : url;
    return (
      <a href={urlWithToken} onMouseDown={this.click}>
        {text}
        {children}
      </a>
    );
  }
}

export default TokenLink;
