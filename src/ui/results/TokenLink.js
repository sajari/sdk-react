import React from "react";

const tokenUrl = "https://www.sajari.com/token/";

class TokenLink extends React.Component {
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
