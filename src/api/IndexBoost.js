import React from 'react'
import { fieldInstanceBoost, scoreInstanceBoost } from 'sajari'

import Base from './Base.js'
import Components from './constants/QueryComponentConstants.js'

const IndexBoost = props => {
  const { data, namespace, ...others } = props
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.INSTANCE_BOOSTS}
      data={data}
      namespace={namespace}
    />
  )
}

IndexBoost.propTypes = {
  data: React.PropTypes.object.isRequired,
  namespace: React.PropTypes.string,
}

const FieldInstanceBoost = props => {
  const { field, value, namespace, ...others } = props
  return (
    <IndexBoost
      {...others}
      data={fieldInstanceBoost(field, value)}
      namespace={namespace}
    />
  )
}

FieldInstanceBoost.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
  namespace: React.PropTypes.string,
}

const ScoreInstanceBoost = props => {
  const { threshold, minCount, namespace, ...others } = props
  return (
    <IndexBoost
      {...others}
      data={scoreInstanceBoost(threshold, minCount)}
      namespace={namespace}
    />
  )
}

ScoreInstanceBoost.propTypes = {
  threshold: React.PropTypes.number.isRequired,
  min_count: React.PropTypes.number.isRequired,
  namespace: React.PropTypes.string,
}

export { FieldInstanceBoost, ScoreInstanceBoost }
