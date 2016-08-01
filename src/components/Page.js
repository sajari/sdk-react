import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";

export default class Page extends React.Component {
  static propTypes = {
    page: React.PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.page !== this.props.page;
  }

  render() {
    const {page, ...others} = this.props;
    return (
      <Base
        {...others}
        runDefault="update"
        componentName={Components.PAGE}
        data={page}
      />
    );
  }
}
