import React from 'react';
import {
  distanceMetaBoost, elementMetaBoost, geoMetaBoost, intervalMetaBoost,
  textMetaBoost, filterMetaBoost,
} from 'sajari';

import Base from './Base.js';
import Components from '../constants/Components.js';

// TODO(tbillington): Use children of intervalMetaBoost as points

const MetaBoost = props => {
  const { data, namespace, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.META_BOOST}
      data={data}
      namespace={namespace}
    />
  );
};

MetaBoost.propTypes = {
  data: React.PropTypes.object.isRequired,
  namespace: React.PropTypes.string,
};

const FilterMetaBoost = props => {
  const { filter, value, ...others } = props;
  return (
    <MetaBoost
      {...others}
      data={filterMetaBoost(filter, value)}
    />
  );
};

FilterMetaBoost.propTypes = {
  filter: React.PropTypes.object.isRequired,
  value: React.PropTypes.any.isRequired,
};

const DistanceMetaBoost = props => {
  const { field, value, min, max, ref, namespace, ...others } = props;
  return (
    <MetaBoost
      {...others}
      data={distanceMetaBoost(min, max, ref, field, value)}
      namespace={namespace}
    />
  );
};

DistanceMetaBoost.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  ref: React.PropTypes.number.isRequired,
  namespace: React.PropTypes.string,
};

const ElementMetaBoost = props => {
  const { field, values, namespace, ...others } = props;
  return (
    <MetaBoost
      {...others}
      data={elementMetaBoost(field, values)}
      namespace={namespace}
    />
  );
};

ElementMetaBoost.propTypes = {
  field: React.PropTypes.string.isRequired,
  values: React.PropTypes.string.isRequired,
  namespace: React.PropTypes.string,
};

const GeoMetaBoost = props => {
  const { fieldLat, fieldLng, lat, lng, radius, value, region, namespace, ...others } = props;
  return (
    <MetaBoost
      {...others}
      data={geoMetaBoost(fieldLat, fieldLng, lat, lng, radius, value, region)}
      namespace={namespace}
    />
  );
};

GeoMetaBoost.propTypes = {
  fieldLat: React.PropTypes.string.isRequired,
  fieldLng: React.PropTypes.string.isRequired,
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
  radius: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  region: React.PropTypes.string.isRequired,
  namespace: React.PropTypes.string,
};

const IntervalMetaBoost = props => {
  const { field, points, namespace, ...others } = props;
  return (
    <MetaBoost
      {...others}
      data={intervalMetaBoost(field, points)}
      namespace={namespace}
    />
  );
};

IntervalMetaBoost.propTypes = {
  field: React.PropTypes.string.isRequired,
  points: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  namespace: React.PropTypes.string,
};

const TextMetaBoost = props => {
  const { field, text, namespace, ...others } = props;
  return (
    <MetaBoost
      {...others}
      data={textMetaBoost(field, text)}
      namespace={namespace}
    />
  );
};

TextMetaBoost.propTypes = {
  field: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  namespace: React.PropTypes.string,
};

export {
  IntervalMetaBoost, TextMetaBoost, GeoMetaBoost, ElementMetaBoost, DistanceMetaBoost,
  FilterMetaBoost,
};
