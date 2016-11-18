import React from 'react'
import uuid from 'uuid'
import equal from 'deep-equal'

import SearchActions from '../actions/SearchActions.js'
import Components from '../constants/QueryComponentConstants.js'

class Base extends React.Component {
  constructor(props) {
    super(props)
    this.state = { uuid: uuid.v4() }
  }

  componentDidMount() {
    const { namespace, componentName, data } = this.props
    const { uuid } = this.state
    SearchActions.update(namespace, uuid, componentName, data)

    if (this.props.runOnMount) {
      SearchActions.nsearch(this.props.namespace)
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.runIfSame && equal(newProps, this.props)) {
      return
    }
    const { namespace, componentName, data } = newProps
    const { uuid } = this.state
    SearchActions.update(namespace, uuid, componentName, data)

    if (newProps.runOnUpdate) {
      SearchActions.nsearch(namespace)
    }
  }

  componentWillUnmount() {
    const { namespace, componentName } = this.props
    const { uuid } = this.state
    SearchActions.remove(namespace, uuid, componentName)

    if (this.props.runOnUnmount) {
      SearchActions.nsearch(this.props.namespace)
    }
  }

  render() { return null }
}

Base.propTypes = {
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

Base.defaultProps = {
  runOnMount: false,
  runOnUnmount: false,
  runOnUpdate: false,
  namespace: 'default',
}

export default Base
