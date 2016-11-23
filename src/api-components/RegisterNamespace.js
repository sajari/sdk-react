import React from "react";
import { connect } from 'react-redux'

import { addNamespace, removeNamespace } from '../actions/query'

class registerNamespace extends React.Component {
  componentDidMount() {
    this.props.addNamespace(this.props.namespace, this.props.project, this.props.collection)
  }

  componentWillUnmount() {
    this.props.removeNamespace(this.props.namespace)
  }

  render() { return null }
}

registerNamespace.defaultProps = {
  namespace: 'default',
}

const RegisterNamespace = connect(
  null,
  dispatch => ({
    addNamespace: (namespace, project, collection) => dispatch(addNamespace(namespace, project, collection)),
    removeNamespace: (namespace) => dispatch(removeNamespace(namespace)),
  })
)(registerNamespace)

export default RegisterNamespace
