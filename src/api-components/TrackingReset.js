import React, { Component } from 'react'

import Base from './Base'
import Components from '../constants/QueryComponentConstants'

import SearchActions from '../actions/SearchActions'

export default class TrackingReset extends Component {
  componentDidMount() {
    SearchActions.trackingReset(this.props.namespace || 'default')
  }

  componentWillReceiveProps(nextProps) {
    SearchActions.trackingReset(nextProps.namespace || 'default')
  }

  render() {
    return null
  }
}
