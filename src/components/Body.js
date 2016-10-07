import React, { Component } from 'react'

import { fieldFilter, FILTER_OP_HAS_PREFIX, FILTER_OP_CONTAINS } from 'sajari'

import { default as BaseBody } from '../api-components/Body'
import { FilterFieldBoost } from '../api-components'
import { ALL } from '../constants/RunModes'

class Body extends Component {
  shouldComponentUpdate(newProps) {
    // Don't update the component if the text doesn't satisfy the minimum length
    return newProps.text.length >= newProps.minLength
  }

  render() {
    const { text, minLength, prefixBoosts, containsBoosts } = this.props

    // Stop rendering happening on initial render if the text doesn't satisfy the minimum length
    if (text < minLength) {
      return null
    }

    const prefixBoostComponents = []
    for (let field in prefixBoosts) {
      prefixBoostComponents.push(
        <FilterFieldBoost
          key={field}
          filter={fieldFilter(field, text, FILTER_OP_HAS_PREFIX)}
          value={prefixBoosts[field]}
        />
      )
    }

    const containsBoostComponents = []
    for (let field in containsBoosts) {
      containsBoostComponents.push(
        <FilterFieldBoost
          key={field}
          filter={fieldFilter(field, text, FILTER_OP_CONTAINS)}
          value={containsBoosts[field]}
        />
      )
    }

    return (
      <div>
        {prefixBoostComponents}
        {containsBoostComponents}
        <BaseBody body={text} run={ALL} weight={1} />
      </div>
    )
  }
}

Body.propTypes = {
  text: React.PropTypes.string.isRequired,
  minLength: React.PropTypes.number,
  prefixBoosts: React.PropTypes.object,
  containsBoosts: React.PropTypes.object,
}

Body.defaultProps = {
  text: '',
  minLength: 3,
  prefixBoosts: {},
  containsBoosts: {},
}

export default Body
