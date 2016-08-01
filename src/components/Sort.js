import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";
import {Sort as SortBuilder} from "../utils/SortUtils.js";

export default class Sort extends React.Component {
  static propTypes = {
    field: React.PropTypes.string.isRequired,
    ord: React.PropTypes.oneOf(["ASC", "DESC"]).isRequired,
  };

  render() {
    const {field, ord, ...others} = this.props;
    return (
      <Base
        {...others}
        runDefault="update"
        componentName={Components.SORT}
        data={SortBuilder(field, ord)}
      />
    );
  }
}
