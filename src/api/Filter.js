import React from 'react'

import Base from './Base.js'
import Components from './constants/QueryComponentConstants.js'

const Filter = props => {
  const { data, ...others } = props
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.FILTER}
      data={data}
    />
  )
}

Filter.propTypes = {
  data: React.PropTypes.object.isRequired,
}

export default Filter
