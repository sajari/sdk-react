import React from "react";

const tokenUrl = "https://www.sajari.com/token/";

class TokenLink extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter Filter object.
   * @property {function()} resultClicked Function to be called when the result is clicked. Typically for analytics
   * @property {string} token Token to use in click tracking.
   * @property {string} url URL of the result.
   * @property {string} text Text to render.
   * @property {Object} [children] Children to render.
   */
  static get propTypes() {
    return {
      filter: PropTypes.instanceOf(Filter).isRequired
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
