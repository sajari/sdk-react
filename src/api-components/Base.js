// @flow
import React from 'react'
import uuid from 'uuid'
import equal from 'deep-equal'

import SearchActions from '../actions/SearchActions.js'
import Components from '../constants/QueryComponentConstants.js'

import { connect } from 'react-redux'
import { addQueryComponent, modifyQueryComponent, removeQueryComponent, makeSearchRequest } from '../actions/query'

class base extends React.Component {
  constructor(props) {
    super(props)
    this.state = { uuid: uuid.v4() }
  }

  componentDidMount() {
    const { namespace, componentName, data } = this.props
    const { uuid } = this.state
    SearchActions.update(namespace, uuid, componentName, data)

    if (this.props.runOnMount) {
      // SearchActions.nsearch(this.props.namespace)
      this.props.makeSearchRequest()
    }

    this.props.addQueryComponent(uuid, namespace, data, componentName)
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.runIfSame && equal(newProps, this.props)) {
      return
    }
    const { namespace, componentName, data } = newProps
    const { uuid } = this.state
    SearchActions.update(namespace, uuid, componentName, data)

    if (newProps.runOnUpdate) {
      // SearchActions.nsearch(namespace)
      this.props.makeSearchRequest()
    }

    this.props.modifyQueryComponent(uuid, namespace, data, componentName)
  }

  componentWillUnmount() {
    const { namespace, componentName } = this.props
    const { uuid } = this.state
    SearchActions.remove(namespace, uuid, componentName)

    if (this.props.runOnUnmount) {
      // SearchActions.nsearch(this.props.namespace)
      this.props.makeSearchRequest()
    }

    this.props.removeQueryComponent(uuid, namespace)
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
    removeQueryComponent: (uuid, namespace) => dispatch(removeQueryComponent(uuid, namespace)),
    makeSearchRequest: () => dispatch(makeSearchRequest(props.namespace)),
  }),
)(base)

export default Base
