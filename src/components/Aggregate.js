import React from 'react';
import { bucketAggregate } from 'sajari';

import Base from './Base.js';
import Components from '../constants/Components.js';
import {
  CountAggregate as countAggregate, MetricAggregate as metricAggregate,
} from '../utils/AggregateUtils.js';

export { Bucket } from '../utils/AggregateUtils.js';

const Aggregate = props => {
  const { name, data, namespace, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.AGGREGATE}
      data={{ name, data }}
      namespace={namespace}
    />
  );
};

Aggregate.propTypes = {
  name: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  namespace: React.PropTypes.string,
};

const BucketAggregate = props => {
  const { name, buckets, namespace, ...others } = props;
  return (
    <Aggregate
      {...others}
      name={name}
      data={bucketAggregate(buckets)}
      namespace={namespace}
    />
  );
};

BucketAggregate.propTypes = {
  name: React.PropTypes.string.isRequired,
  buckets: React.PropTypes.array.isRequired,
  namespace: React.PropTypes.string,
};

const CountAggregate = props => {
  const { name, field, namespace, ...others } = props;
  return (
    <Aggregate
      {...others}
      name={name}
      data={countAggregate(field)}
      namespace={namespace}
    />
  );
};

CountAggregate.propTypes = {
  name: React.PropTypes.string.isRequired,
  field: React.PropTypes.string.isRequired,
  namespace: React.PropTypes.string,
};

const MetricAggregate = props => {
  const { name, field, type, namespace, ...others } = props;
  return (
    <Aggregate
      {...others}
      name={name}
      data={metricAggregate(field, type)}
      namespace={namespace}
    />
  );
};

MetricAggregate.propTypes = {
  name: React.PropTypes.string.isRequired,
  field: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  namespace: React.PropTypes.string,
};

export { BucketAggregate, CountAggregate, MetricAggregate };
