import React from "react";

import Base from "./Base.js";
import Components from "../constants/Components.js";
import {
  DistanceBoost, ElementBoost, GeoBoost, IntervalBoost, Point, TextBoost, FilterBoost
} from "../utils/MetaBoostUtils.js";

export class FilterMetaBoost extends React.Component {
  render() {
    const {filter, value, ...others} = this.props;
    return (
      <MetaBoost
        {...others}
        data={FilterBoost(filter, value)}
      />
    )
  }
}

export class MetaBoost extends React.Component {
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
        componentName={Components.META_BOOST}
        data={data}
        namespace={namespace}
      />
    );
  }
}

export class DistanceMetaBoost extends React.Component {
  static propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    min: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    ref: React.PropTypes.number.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {field, value, min, max, ref, namespace, ...others} = this.props;
    return (
        <MetaBoost
          data={DistanceBoost(min, max, ref, field, value)}
          namespace={namespace}
        />
    );
  }
}

export class ElementMetaBoost extends React.Component {
  static propTypes = {
    field: React.PropTypes.string.isRequired,
    values: React.PropTypes.string.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {field, values, namespace, ...others} = this.props;
    return (
        <MetaBoost
          data={ElementBoost(field, values)}
          namespace={namespace}
        />
    );
  }
}

export class GeoMetaBoost extends React.Component {
  static propTypes = {
    fieldLat: React.PropTypes.string.isRequired,
    fieldLng: React.PropTypes.string.isRequired,
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
    radius: React.PropTypes.number.isRequired,
    value: React.PropTypes.number.isRequired,
    region: React.PropTypes.string.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {fieldLat, fieldLng, lat, lng, radius, value, region, namespace, ...others} = this.props;
    return (
        <MetaBoost
          data={GeoBoost(fieldLat, fieldLng, lat, lng, radius, value, region)}
          namespace={namespace}
        />
    );
  }
}

export class IntervalMetaBoost extends React.Component {
  static propTypes = {
    field: React.PropTypes.string.isRequired,
    points: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {field, points, namespace, ...others} = this.props;
    return (
        <MetaBoost
          data={IntervalBoost(field, points)}
          namespace={namespace}
        />
    );
  }
}

export class TextMetaBoost extends React.Component {
  static propTypes = {
    field: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    namespace: React.PropTypes.string,
  };

  render() {
    const {field, text, namespace, ...others} = this.props;
    return (
      <MetaBoost
        data={TextBoost(field, text)}
        namespace={namespace}
      />
    );
  }
}
