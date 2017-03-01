import React, { Children, cloneElement } from 'react'
import { connect } from 'react-redux'

const response = ({ children, response }) => (
  <div>
    {Children.map(children, c => cloneElement(c, response))}
  </div>
)

const Response = connect(
  (state, props) => ({
    response: state.pipelines.pipelineStatus[`${props.namespace}|${props.pipeline}`]
  }),
)(response)

Response.propTypes = {
  namespace: React.PropTypes.string,
  pipeline: React.PropTypes.string.isRequired,
}

Response.defaultProps = {
  namespace: 'default'
}

export default Response
