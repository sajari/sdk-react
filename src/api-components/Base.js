import React from 'react'
import uuid from 'uuid'
import equal from 'deep-equal'

import SearchActions from '../actions/SearchActions.js'
import Components from '../constants/QueryComponentConstants.js'

import { ALL, UPDATE, MOUNT, NONE, MOUNT_UPDATE } from '../constants/RunModes'

class Base extends React.Component {
  constructor(props) {
    super(props)
    this.state = { uuid: uuid.v4() }
  }

  componentDidMount() {
    const { namespace, componentName, data } = this.props
    const { uuid } = this.state
    SearchActions.update(namespace, uuid, componentName, data)

    if (this.props.run === MOUNT || this.props.run === ALL || this.props.run === MOUNT_UPDATE) {
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

    if (this.props.run === UPDATE || this.props.run === ALL || this.props.run === MOUNT_UPDATE) {
      SearchActions.nsearch(this.props.namespace)
    }
  }

  componentWillUnmount() {
    const { namespace, componentName } = this.props
    const { uuid } = this.state
    SearchActions.remove(namespace, uuid, componentName)

    if (this.props.run === MOUNT || this.props.run === ALL) {
      SearchActions.nsearch(this.props.namespace)
    }
  }

  render() { return null }
}

Base.propTypes = {
  run: React.PropTypes.oneOf([ALL, UPDATE, MOUNT, NONE, MOUNT_UPDATE]),
  namespace: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  componentName: React.PropTypes.oneOf(Components.list).isRequired,
  data: React.PropTypes.any.isRequired,
}

Base.defaultProps = {
  run: NONE,
  namespace: 'default',
}

export default Base
