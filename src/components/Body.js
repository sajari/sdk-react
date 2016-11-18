import React, { Component } from 'react'

import { fieldFilter, featureFieldBoost, filterFieldBoost } from 'sajari'

import { default as BaseBody } from '../api-components/Body'
import { FeatureFieldBoost } from '../api-components'
import { MOUNT_UPDATE } from '../constants/RunModes'
import SearchActions from '../actions/SearchActions'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(newProps) {
    // Don't update the component if the text doesn't satisfy the minimum length
    if (newProps.text.length >= newProps.minLength) {
      return true
    }
    SearchActions.clearResults(newProps.namespace)
    return false
  }

  render() {
    const { text, minLength, prefixBoosts, containsBoosts, namespace, clearOnNoBody, ...others } = this.props

    // Stop rendering happening on initial render if the text doesn't satisfy the minimum length
    if (text < minLength) {
      return null
    }

    const prefixBoostComponents = []
    for (let field in prefixBoosts) {
      prefixBoostComponents.push(
        <FeatureFieldBoost
          key={field}
          data={
            featureFieldBoost(
              filterFieldBoost(
                fieldFilter(field, '^', text),
                1,
              ),
              prefixBoosts[field]
            )
          }
          namespace={namespace}
        />
      )
    }

    const containsBoostComponents = []
    for (let field in containsBoosts) {
      containsBoostComponents.push(
        <FeatureFieldBoost
          key={field}
          data={
            featureFieldBoost(
              filterFieldBoost(
                fieldFilter(field, '~', text),
                1,
              ),
              containsBoosts[field]
            )
          }
          namespace={namespace}
        />
      )
    }

    return (
      <div>
        {prefixBoostComponents}
        {containsBoostComponents}
        <BaseBody body={text} weight={1} namespace={namespace} {...others} />
      </div>
    )
  }
}

Body.propTypes = {
  text: React.PropTypes.string.isRequired,
  minLength: React.PropTypes.number,
  prefixBoosts: React.PropTypes.object,
  containsBoosts: React.PropTypes.object,
  namespace: React.PropTypes.string,
  runOnMount: React.PropTypes.bool,
  runOnUpdate: React.PropTypes.bool,
  runOnUnmount: React.PropTypes.bool
}

Body.defaultProps = {
  text: '',
  minLength: 3,
  prefixBoosts: {},
  containsBoosts: {},
  namespace: 'default',
  runOnMount: true,
  runOnUpdate: true,
  runOnUnmount: true,
  clearOnNoBody: true
}

export default Body
