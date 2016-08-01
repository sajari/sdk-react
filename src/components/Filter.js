import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";

export default class Filter extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  };

  render() {
    const {data, ...others} = this.props;
    return (
      <Base
        {...others}
        runDefault="all"
        componentName={Components.FILTER}
        data={data}
      />
    );
  }
}
