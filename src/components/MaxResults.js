import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";

export default class MaxResults extends React.Component {
  static propTypes = {
    maxResults: React.PropTypes.number.isRequired,
  };

  render() {
    const {maxResults, ...others} = this.props;
    return (
      <Base
        {...others}
        runDefault="all"
        componentName={Components.MAXRESULTS}
        data={maxResults}
      />
    );
  }
}
