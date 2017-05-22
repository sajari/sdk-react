import React from "react";
import ReactDOM from "react-dom";

import Input from "./Input";
import SearchResponse from "./SearchResponse";

class InPage extends React.Component {
  componentDidMount() {
    const config = this.props.config;

    ReactDOM.render(
      <SearchResponse config={config} />,
      config.attachSearchResponse
    );
  }

  render() {
    const config = this.props.config;
    return <Input placeHolder={config.searchBoxPlaceHolder} />;
  }
}

export default InPage;
