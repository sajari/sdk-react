import React from "react";
import { connect } from 'react-redux'

import { addNamespace, removeNamespace } from '../actions/query'

class registerNamespace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namespace: props.namespace ? props.namespace : "default",
      engine: props.engine ? props.engine : "v10",
    };
    this.searchOnMount = this.searchOnMount.bind(this);
    PageActions.set(this.state.namespace, 1)
  }

  componentDidMount() {
    if (this.props.searchOnMount) {
      NamespaceStore.addChangeListener(this.searchOnMount);
    }
    NamespaceActions.set(this.props.project, this.props.collection, this.state.namespace, this.state.engine);
    this.props.addNamespace(this.props.namespace, this.props.project, this.props.collection)
  }

  searchOnMount() {
    NamespaceStore.removeChangeListener(this.searchOnMount);
    SearchActions.nsearch(this.state.namespace);
  }

  componentWillReceiveProps(newProps) {
    if (
      (newProps.project !== this.props.project) ||
      (newProps.collection !== this.props.collection) ||
      (newProps.namespace !== this.state.namespace) ||
      (newProps.engine !== this.state.engine)
    ) {
      this.setState = {
        namespace: newProps.namespace ? newProps.namespace : "default",
        engine: newProps.engine ? newProps.engine : "v10",
      };
      NamespaceActions.set(this.props.project, this.props.collection, this.state.namespace, this.state.engine);
    }
  }

  componentWillUnmount() {
    NamespaceActions.remove(this.state.namespace);
    this.props.removeNamespace(this.props.namespace)
  }

  render() {
    return null;
  }
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
