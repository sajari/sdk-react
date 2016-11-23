import React, { Component } from 'react'
import { connect } from 'react-redux'

import { flushQueryTracking } from '../actions/query'

class trackingReset extends Component {
  componentDidMount() {
    this.props.flushQueryTracking()
  }

  render() { return null }
}

const TrackingReset = connect(
  null,
  (dispatch, props) => ({
    flushQueryTracking: () => dispatch(flushQueryTracking(props.namespace)),
  }),
)(trackingReset)

export default TrackingReset
