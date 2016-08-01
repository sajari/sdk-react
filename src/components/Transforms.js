import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";

export default class Transforms extends React.Component {
  static propTypes = {
    transforms: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  };

  render() {
    const {transforms, ...others} = this.props;
    return (
      <Base
        {...others}
        runDefault="update"
        componentName={Components.TRANSFORMS}
        data={transforms}
      />
    );
  }
}
