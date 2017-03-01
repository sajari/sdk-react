import React from 'react'
import { connect } from 'react-redux'

import {
  addPipelineValue, modifyPipelineValue, removePipelineValue,
  changePipelineValueNamespace, makePipelineSearchRequest
} from '../api/actions/pipeline'

class value extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { namespace, pipeline, name, value } = this.props
    this.props.addPipelineValue(namespace, pipeline, name, value)

    if (this.props.runOnMount) {
      this.props.makePipelineSearchRequest()
    }
  }

  componentWillReceiveProps(newProps) {
    const { namespace: newNamespace, pipeline, name, value } = newProps

    if (newNamespace === this.props.namespace) {
      // The namespace has not changed so we can modify the query component value in place
      this.props.modifyPipelineValue(newNamespace, pipeline, name, value)
      if (newProps.runOnUpdate) {
        this.props.makePipelineSearchRequest()
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
      this.props.makePipelineSearchRequest()
    }
  }

  render() { return null }
}

const Value = connect(
  null,
  (dispatch, props) => ({
    addPipelineValue: (namespace, pipeline, name, value) => dispatch(addPipelineValue(namespace, pipeline, name, value)),
    modifyPipelineValue: (namespace, pipeline, name, value) => dispatch(modifyPipelineValue(namespace, pipeline, name, value)),
    changePipelineValueNamespace: (oldNamespace, newNamespace) => dispatch(changePipelineValueNamespace(oldNamespace, newNamespace)),
    removePipelineValue: (namespace, pipeline, name) => dispatch(removePipelineValue(namespace, pipeline, name)),
    makePipelineSearchRequest: () => dispatch(makePipelineSearchRequest(props.namespace, props.pipeline)),
  }),
)(value)

Value.propTypes = {
  runOnMount: React.PropTypes.bool,
  runOnUnmount: React.PropTypes.bool,
  runOnUpdate: React.PropTypes.bool,
  namespace: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  pipeline: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
}

Value.defaultProps = {
  runOnMount: false,
  runOnUnmount: false,
  runOnUpdate: false,
  namespace: 'default',
}

export default Value
