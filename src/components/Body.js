import React, { Component } from 'react'

import { fieldFilter, featureFieldBoost, filterFieldBoost } from 'sajari'

import { default as BaseBody } from '../api-components/Body'
import { FeatureFieldBoost } from '../api-components'

import { makeSearchRequest } from '../actions/query'

import { connect } from 'react-redux'


const BodyFieldBoost = ({ namespace, field, op, text, value }) => (
  <FeatureFieldBoost
    key={field}
    data={featureFieldBoost(filterFieldBoost(fieldFilter(field, op, text), 1), value)}
    namespace={namespace}
  />
)

class body extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.triggerSearch = this.triggerSearch.bind(this)
  }

  triggerSearch() {
    if (this.props.text.length >= this.props.minLength) {
      this.props.makeSearchRequest()
    }
  }

  componentDidMount() {
    this.triggerSearch()
  }

  componentDidUpdate() {
    this.triggerSearch()
  }

  render() {
    const { text, prefixBoosts, containsBoosts, namespace, ...others } = this.props

    const prefixBoostComponents = Object.keys(prefixBoosts).map(field => (
      <BodyFieldBoost namespace={namespace} field={field} op='^' text={text} value={prefixBoosts[field]} />
    ))

    const containsBoostComponents = Object.keys(containsBoosts).map(field => (
      <BodyFieldBoost namespace={namespace} field={field} op='~' text={text} value={containsBoosts[field]} />
    ))

    return (
      <div>
        {prefixBoostComponents}
        {containsBoostComponents}
        <BaseBody body={text} weight={1} namespace={namespace} {...others} />
      </div>
    )
  }
}

const Body = connect(
  null,
  (dispatch, props) => ({
    makeSearchRequest: () => dispatch(makeSearchRequest(props.namespace)),
  }),
)(body)

Body.propTypes = {
  text: React.PropTypes.string.isRequired,
  minLength: React.PropTypes.number,
  prefixBoosts: React.PropTypes.object,
  containsBoosts: React.PropTypes.object,
  namespace: React.PropTypes.string,
}

Body.defaultProps = {
  text: '',
  minLength: 3,
  prefixBoosts: {},
  containsBoosts: {},
  namespace: 'default',
}

export default Body
