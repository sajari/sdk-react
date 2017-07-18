import React from "react";

import AutocompleteInput from "./AutocompleteInput";

import { values } from "./resources";

class InPage extends React.Component {
  render() {
    return <AutocompleteInput values={values} />;
  }
}

export default InPage;
