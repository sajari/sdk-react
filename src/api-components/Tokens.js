import React from 'react'

import Base from './Base'
import Components from '../constants/QueryComponentConstants'

const ClickTokens = props => {
  const { field, ...others } = props
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.CLICK_TOKENS}
      data={field || '_id'}
    />
  )
}

const PosNegTokens = props => {
  const { field, ...others } = props
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.POS_NEG_TOKENS}
      data={field || '_id'}
    />
  )
}

export { ClickTokens, PosNegTokens }
