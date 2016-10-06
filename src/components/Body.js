import React from 'react'
import {default as BaseBody} from '../api-components/Body'

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
          filter={filterField(field, text, FILTER_OP_HAS_PREFIX)}
          value={prefixBoosts[field]}
        />
      )
    }

    const containsBoostComponents = []
    for (let field in containsBoosts) {
      containsBoostComponents.push(
        <FilterFieldBoost
          key={field}
          filter={filterField(field, text, FILTER_OP_CONTAINS)}
          value={containsBoosts[field]}
        />
      )
    }

    return (
      <div>
        {prefixBoostComponents}
        {containsBoostComponents}
        <Body body={text} run='ALL' />
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
