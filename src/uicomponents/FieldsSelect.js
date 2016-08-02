import React from "react";

import Fields from "../components/Fields.js";

export default class FieldsSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fields: ""};

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(evt) {
    this.setState({
      fields: evt.target.value,
    });
  }

  render() {
    return (
      <div>
        <label>Fields</label>
        <input type="text" value={this.state.fields} onChange={this.onInputChange} />
        <Fields fields={this.state.fields.split(",")} />
      </div>
    );
  }
}
