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
      data={field}
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
      data={field}
    />
  )
}

export { ClickTokens, PosNegTokens }
