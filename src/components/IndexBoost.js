import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";

import {FieldBoost as fieldBoost, ScoreBoost as scoreBoost} from "../utils/IndexBoostUtils.js";

export class IndexBoost extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {data, namespace, ...others} = this.props;
    return (
      <Base
        {...others}
        runDefault="all"
        componentName={Components.INDEX_BOOST}
        data={data}
        namespace={namespace}
      />
    );
  }
}

export class FieldBoost extends React.Component {
  static propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {field, value, namespace, ...others} = this.props;
    return (
      <IndexBoost
        {...others}
        data={fieldBoost(field, value)}
        namespace={namespace}
      />
    );
  }
}

export class ScoreBoost extends React.Component {
  static propTypes = {
    threshold: React.PropTypes.number.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {threshold, namespace, ...others} = this.props;
    return (
      <IndexBoost
        {...others}
        data={scoreBoost(threshold)}
        namespace={namespace}
      />
    );
  }
}
