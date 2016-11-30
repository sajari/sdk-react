import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'

import Components from './constants/QueryComponentConstants.js'
import {
  addQueryComponent, modifyQueryComponent, removeQueryComponent,
  changeQueryComponentNamespace, makeSearchRequest
} from './actions/query'

class base extends React.Component {
  constructor(props) {
    super(props)
    this.state = { uuid: uuid.v4() }
  }

  componentDidMount() {
    const { namespace, componentName, data } = this.props
    const { uuid } = this.state
    this.props.addQueryComponent(uuid, namespace, data, componentName)

    if (this.props.runOnMount) {
      this.props.makeSearchRequest()
    }
  }

  componentWillReceiveProps(newProps) {
    const { newNamespace, componentName, data } = newProps
    const { uuid } = this.state

    if (newNamespace === this.props.namespace) {
      // The namespace has not changed so we can modify the query component data in place
      this.props.modifyQueryComponent(uuid, newNamespace, data, componentName)
    } else {
      // The namespace has changed so we must remove the component from the old namespace and add it to the new
      this.props.changeQueryComponentNamespace(uuid, this.props.namespace, newNamespace)
    }

    if (newProps.runOnUpdate) {
      this.props.makeSearchRequest()
    }
  }

  componentWillUnmount() {
    const { namespace, componentName } = this.props
    const { uuid } = this.state
    this.props.removeQueryComponent(uuid, namespace)

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
  componentName: React.PropTypes.oneOf(Components.list).isRequired,
  data: React.PropTypes.any.isRequired,
}

base.defaultProps = {
  runOnMount: false,
  runOnUnmount: false,
  runOnUpdate: false,
  namespace: 'default',
}

const Base = connect(
  null,
  (dispatch, props) => ({
    addQueryComponent: (uuid, namespace, data, queryDataType) => dispatch(addQueryComponent(uuid, namespace, data, queryDataType)),
    modifyQueryComponent: (uuid, namespace, data, queryDataType) => dispatch(modifyQueryComponent(uuid, namespace, data, queryDataType)),
    changeQueryComponentNamespace: (uuid, oldNamespace, newNamespace) => dispatch(changeQueryComponentNamespace(uuid, oldNamespace, newNamespace)),
    removeQueryComponent: (uuid, namespace) => dispatch(removeQueryComponent(uuid, namespace)),
    makeSearchRequest: () => dispatch(makeSearchRequest(props.namespace)),
  }),
)(base)

export default Base
