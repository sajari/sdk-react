import React from 'react'
import { connect } from 'react-redux'

import { addPipeline, removePipeline } from './actions/pipeline'

class pipeline extends React.Component {
  componentDidMount() {
    this.props.addPipeline(this.props.namespace, this.props.name)
  }

  componentWillUnmount() {
    this.props.removePipeline(this.props.namespace, this.props.name)
  }

  render() { return null }
}

pipeline.defaultProps = {
  namespace: 'default',
}

const Pipeline = connect(
  null,
  dispatch => ({
    addPipeline: (namespace, name) => dispatch(addPipeline(namespace, name)),
    removePipeline: (namespace, name) => dispatch(removePipeline(namespace, name)),
  })
)(pipeline)

export default Pipeline
