import React from "react";

import NamespaceActions from "../actions/NamespaceActions.js";
import SearchActions from "../actions/SearchActions.js";

import NamespaceStore from "../stores/NamespaceStore.js";

export default class RegisterNamespace extends React.Component {
  static propTypes = {
    project: React.PropTypes.string.isRequired,
    collection: React.PropTypes.string.isRequired,
    namespace: React.PropTypes.string,
    searchOnMount: React.PropTypes.bool,
    engine: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      namespace: props.namespace ? props.namespace : "default",
      engine: props.engine ? props.engine : "v10",
    };
    this.searchOnMount = this.searchOnMount.bind(this);
  }

  componentDidMount() {
    if (this.props.searchOnMount) {
      NamespaceStore.addChangeListener(this.searchOnMount);
    }
    NamespaceActions.set(this.props.project, this.props.collection, this.state.namespace, this.state.engine);
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
  }

  render() {
    return null;
  }
}
