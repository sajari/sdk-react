import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";
import {CountAggregate as countAggregate, MetricAggregate as metricAggregate} from "../utils/AggregateUtils.js";

export {Bucket} from "../utils/AggregateUtils.js";

export class Aggregate extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {name, data, namespace, ...others} = this.props;
    return (
      <Base
        {...others}
        runDefault="all"
        componentName={Components.AGGREGATE}
        data={{name: name, data: data}}
        namespace={namespace}
      />
    );
  }
}

export class MetricAggregate extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {name, field, type, namespace, ...others} = this.props;
    return (
      <Aggregate
        {...others}
        name={name}
        data={metricAggregate(field, type)}
        namespace={namespace}
      />
    );
  }
}

export class CountAggregate extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {name, field, namespace, ...others} = this.props;
    return (
      <Aggregate
        {...others}
        name={name}
        data={countAggregate(field)}
        namespace={namespace}
      />
    );
  }
}

export class BucketAggregate extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    buckets: React.PropTypes.array.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {name, buckets, namespace, ...others} = this.props;
    return (
      <Aggregate
        {...others}
        name={name}
        data={BucketAggregate(buckets)}
        namespace={namespace}
      />
    );
  }
}
