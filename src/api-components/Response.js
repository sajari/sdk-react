import React, { Children, cloneElement } from 'react'

import { connect } from 'react-redux'

const response = ({ namespace, children, response }) => (
  <div>
    {Children.map(children, c => cloneElement(c, response ))}
  </div>
)

const Response = connect(
  (state, props) => ({
    response: state.query.queryStatus[props.namespace]
  }),
)(response)

Response.defaultProps = {
  namespace: 'default'
}

export default Response
