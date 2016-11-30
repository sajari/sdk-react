import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fieldFilter, featureFieldBoost, filterFieldBoost } from 'sajari'

import { FeatureFieldBoost, Body as BaseBody } from '../api'
import { makeSearchRequest } from '../api/actions/query'


const BodyFieldBoost = ({ namespace, field, op, text, value }) => (
  <FeatureFieldBoost
    key={field}
    data={featureFieldBoost(filterFieldBoost(fieldFilter(field, op, text), 1), value)}
    namespace={namespace}
  />
)

const body = props => {
  const { text, prefixBoosts, containsBoosts, namespace, ...others } = props

  const prefixBoostComponents = Object.keys(prefixBoosts).map(field => (
    <BodyFieldBoost key={'prefixBoost' + field} namespace={namespace} field={field} op='^' text={text} value={prefixBoosts[field]} />
  ))

  const containsBoostComponents = Object.keys(containsBoosts).map(field => (
    <BodyFieldBoost key={'containsBoost' + field} namespace={namespace} field={field} op='~' text={text} value={containsBoosts[field]} />
  ))

  return (
    <div>
      {prefixBoostComponents}
      {containsBoostComponents}
      <BaseBody body={text} weight={1} namespace={namespace} {...others} />
    </div>
  )
}

const Body = connect(
  null,
  (dispatch, props) => ({
    makeSearchRequest: () => dispatch(makeSearchRequest(props.namespace)),
  }),
)(body)

Body.propTypes = {
  text: React.PropTypes.string.isRequired,
  minLength: React.PropTypes.number,
  prefixBoosts: React.PropTypes.object,
  containsBoosts: React.PropTypes.object,
  namespace: React.PropTypes.string,
}

Body.defaultProps = {
  text: '',
  minLength: 3,
  prefixBoosts: {},
  containsBoosts: {},
  namespace: 'default',
}

export default Body
