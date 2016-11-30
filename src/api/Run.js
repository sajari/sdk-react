import React, { Component } from 'react';
import { connect } from 'react-redux'

import { makeSearchRequest } from './actions/query'

class run extends Component {
  componentDidMount() {
    this.props.makeSearchRequest()
  }

  componentWillUnmount() {
    if (this.props.runOnUnmount) {
      this.props.makeSearchRequest()
    }
  }

  render() { return null }
}

const Run = connect(
  null,
  (dispatch, props) => ({
    makeSearchRequest: () => dispatch(makeSearchRequest(props.namespace)),
  }),
)(run)

run.propTypes = {
  namespace: React.PropTypes.string,
  runOnUnmount: React.PropTypes.bool,
}

Run.defaultProps = {
  namespace: 'default',
  runOnUnmount: false,
}

export default Run
