import React from "react";

import { AutocompleteInput } from "sajari-react/ui/text";

import { values, pipeline, tracking } from "./resources";

class InPage extends React.Component {
  render() {
    return <AutocompleteInput values={values} pipeline={pipeline} tracking={tracking} />;
  }
}

export default InPage;
