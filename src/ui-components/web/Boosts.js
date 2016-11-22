import React from 'react'

import { IntervalFieldBoost } from '../../api-components'
import { pointValue } from 'sajari'

/*
 * BoostRules applies boosting to web collections based on boosting values set
 * by the crawler when indexing pages.
 */
const BoostRules = ({ maxValue, minValue, ...props }) => (
  <IntervalFieldBoost {...props} field='boost' points={[ pointValue(0, minValue), pointValue(100, maxValue) ]} />
)

BoostRules.propTypes = {
  maxValue: React.PropTypes.number,
  minValue: React.PropTypes.number
}

BoostRules.defaultProps = {
  maxValue: 1.0,
  minValue: 0.0
}

/*
 * BoostRecent applies a boost which prioritises content which is more recent.
 */
const BoostRecent = ({ maxValue, minValue, timeInterval, ...props }) => {
  const timestampNow = parseInt(Date.now() / 1000, 10)
  return <IntervalFieldBoost {...props} field='firstseen' points={[ pointValue(timestampNow-timeInterval, minValue), pointValue(timestampNow, maxValue) ]} />
}

BoostRecent.propTypes = {
  timeInterval: React.PropTypes.integer, // Time in milliseconds after which documents will score 0.
  maxValue: React.PropTypes.number,
  minValue: React.PropTypes.number

}

BoostRecent.defaultProps = {
  timeInterval: 10*365*24*60*60, // 10 years
  maxValue: 1.0,
  minValue: 0.0
}

export { BoostRules, BoostRecent }
