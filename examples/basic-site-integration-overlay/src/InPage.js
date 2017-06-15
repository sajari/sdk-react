import React from "react";

import Input from "./Input";

class InPage extends React.Component {
  componentDidMount() {
    this.props.setupInPageResults();
  }

  render() {
    const config = this.props.config;
    return <Input placeHolder={config.searchBoxPlaceHolder} />;
  }
}

export default InPage;
