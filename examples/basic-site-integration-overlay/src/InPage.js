import React from "react";

// import AutocompleteInput from "sajari-react/pipeline/AutocompleteInput";

// class InPage extends React.Component {
//   render() {
//     const config = this.props.config;
//     return <AutocompleteInput placeHolder={config.searchBoxPlaceHolder} />;
//   }
// }

import values from "./state";

class AutocompleteInput extends React.Component {
  render() {
    const { values } = this.props;
    return <input value={values.q} />;
  }
}

class InPage extends React.Component {
  render() {
    return <AutocompleteInput values={values} />;
  }
}

export default InPage;
