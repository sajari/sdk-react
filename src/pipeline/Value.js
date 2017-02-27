import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'

import Components from './constants/QueryComponentConstants.js'
import {
  addPipelineValue, modifyPipelineValue, removePipelineValue,
  changePipelineValueNamespace, makeSearchRequest
} from './actions/pipeline'

class value extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { namespace, pipeline, name, value } = this.props
    this.props.addPipelineValue(namespace, pipeline, name, value)

    if (this.props.runOnMount) {
      this.props.makeSearchRequest()
    }
  }

  componentWillReceiveProps(newProps) {
    const { namespace: newNamespace, pipeline, name, value } = newProps

    if (newNamespace === this.props.namespace) {
      // The namespace has not changed so we can modify the query component value in place
      this.props.modifyPipelineValue(newNamespace, pipeline, name, value)
      if (newProps.runOnUpdate) {
        this.props.makeSearchRequest()
      }
    } else {
      // The namespace has changed so we must remove the component from the old namespace and add it to the new
      this.props.changePipelineValueNamespace(this.props.namespace, newNamespace)
    }
  }

  componentWillUnmount() {
    const { namespace, pipeline, name } = this.props
    this.props.removePipelineValue(namespace, pipeline, name)

    if (this.props.runOnUnmount) {
      this.props.makeSearchRequest()
    }
  }

  render() { return null }
}

base.propTypes = {
  runOnMount: React.PropTypes.bool,
  runOnUnmount: React.PropTypes.bool,
  runOnUpdate: React.PropTypes.bool,
  namespace: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
}

base.defaultProps = {
  runOnMount: false,
  runOnUnmount: false,
  runOnUpdate: false,
  namespace: 'default',
}

const Value = connect(
  null,
  (dispatch, props) => ({
    addPipelineValue: (namespace, pipeline, name, value) => dispatch(addPipelineValue(namespace, pipeline, name, value)),
    modifyPipelineValue: (namespace, pipeline, name, value) => dispatch(modifyPipelineValue(namespace, pipeline, name, value)),
    changePipelineValueNamespace: (oldNamespace, newNamespace) => dispatch(changePipelineValueNamespace(oldNamespace, newNamespace)),
    removePipelineValue: (namespace, pipeline, name) => dispatch(removePipelineValue(namespace, pipeline, name)),
    makeSearchRequest: () => dispatch(makeSearchRequest(props.namespace)),
  }),
)(base)

export default Value