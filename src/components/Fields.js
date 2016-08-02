import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";

export default class Fields extends React.Component {
  static propTypes = {
    fields: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props);
  }

  render () {
    const {fields, ...others} = this.props;
    return (
      <Base
        {...others}
        runDefault="all"
        componentName={Components.FIELDS}
        data={fields}
      />
    );
  }
}
