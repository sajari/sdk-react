import React, { Component } from 'react'
import { connect } from 'react-redux'

import { resetQueryTracking } from './actions/query'

class trackingReset extends Component {
  componentDidMount() {
    this.props.resetQueryTracking()
  }

  render() { return null }
}

const TrackingReset = connect(
  null,
  (dispatch, props) => ({
    resetQueryTracking: () => dispatch(resetQueryTracking(props.namespace)),
  }),
)(trackingReset)

export default TrackingReset
