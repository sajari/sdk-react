import React from "react";

import AutocompleteInput from "sajari-react/ui/searchInput/AutocompleteInput";

import { values, pipeline } from "./resources";

class InPage extends React.Component {
  render() {
    return <AutocompleteInput values={values} pipeline={pipeline} />;
  }
}

export default InPage;
