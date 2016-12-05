import React from 'react'

import Base from './Base.js'
import Components from './constants/QueryComponentConstants.js'

const Offset = props => {
  const { offset, ...others } = props
  return (
    <Base
      {...others}
      runDefault='update'
      componentName={Components.OFFSET}
      data={offset}
    />
  )
}

Offset.propTypes = {
  offset: React.PropTypes.number,
}

Offset.defaultProps = {
  offset: 0,
}

export default Offset
