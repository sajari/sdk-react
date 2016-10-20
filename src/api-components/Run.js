import React, { Component } from 'react';

import SearchActions from '../actions/SearchActions.js';

class Run extends Component {
  componentDidMount() {
    SearchActions.nsearch(this.props.namespace);
  }

  componentWillUnmount() {
    if (this.props.runOnUnmount) {
      SearchActions.nsearch(this.props.namespace);
    }
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
  runOnUnmount: React.PropTypes.bool,
};

Run.defaultProps = {
  namespace: 'default',
  runOnUnmount: true,
}

export default Run;
