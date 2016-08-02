import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";
import {Body as BodyBuilder} from "../utils/BodyUtils.js";

export default class Body extends React.Component {
  static propTypes = {
    body: React.PropTypes.string.isRequired,
    weight: (props, propName, componentName) => {
      const w = props[propName];
      if (!w) {
        return null;
      } else if (typeof w !== "number" || w <= 0) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` must be a positive number.`
        );
      }
    },
  };

  render() {
    const {body, weight, ...others} = this.props;
    return (
      <Base
        {...others}
        runDefault="all"
        componentName={Components.BODY}
        data={BodyBuilder(body, weight ? weight : 1)}
      />
    );
  }
}
