import React, { Component } from 'react';

import SearchActions from '../actions/SearchActions.js';

class Run extends Component {
  componentDidMount() {
    SearchActions.nsearch(this.props.namespace || 'default');
  }

  componentWillUnmount() {
    SearchActions.nsearch(this.props.namespace || 'default');
  }

  render() {
    return null;
  }
}

Run.propTypes = {
  namespace: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
};

export default Run;
