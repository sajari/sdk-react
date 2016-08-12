import React, { Component } from 'react';

import SearchActions from '../actions/SearchActions.js';

class Run extends Component {
  static propTypes = {
    namespace: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
  }

  componentDidMount() {
    SearchActions.nsearch(this.props.namespace)
  }

  componentWillUnmount() {
    SearchActions.nsearch(this.props.namespace)
  }

  render() {
    return null;
  }
}

export default Run;
