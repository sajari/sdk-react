import React from 'react'
import { connect } from 'react-redux'

import { addPipeline, removePipeline } from '../api/actions/pipeline'

class pipeline extends React.Component {
  componentDidMount() {
    this.props.addPipeline(this.props.namespace, this.props.name)
  }

  componentWillUnmount() {
    this.props.removePipeline(this.props.namespace, this.props.name)
  }

  render() { return null }
}

const Pipeline = connect(
  null,
  dispatch => ({
    addPipeline: (namespace, name) => dispatch(addPipeline(namespace, name)),
    removePipeline: (namespace, name) => dispatch(removePipeline(namespace, name)),
  })
)(pipeline)

Pipeline.defaultProps = {
  namespace: 'default',
}

export default Pipeline
