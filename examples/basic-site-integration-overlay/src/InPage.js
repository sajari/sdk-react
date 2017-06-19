import React from "react";

import AutocompleteInput from "sajari-react/pipeline/AutocompleteInput";

class InPage extends React.Component {
  render() {
    const config = this.props.config;
    return <AutocompleteInput placeHolder={config.searchBoxPlaceHolder} />;
  }
}

export default InPage;
