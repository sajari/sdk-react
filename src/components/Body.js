import React, { Component } from 'react'

import { fieldFilter, additiveFieldBoost, filterFieldBoost } from 'sajari'

import { default as BaseBody } from '../api-components/Body'
import { FilterFieldBoost, FieldBoost } from '../api-components'
import { MOUNT_UPDATE } from '../constants/RunModes'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(newProps) {
    // Don't update the component if the text doesn't satisfy the minimum length
    return newProps.text.length >= newProps.minLength
  }

  render() {
    const { text, minLength, prefixBoosts, containsBoosts, namespace } = this.props

    // Stop rendering happening on initial render if the text doesn't satisfy the minimum length
    if (text < minLength) {
      return null
    }

    const prefixBoostComponents = []
    for (let field in prefixBoosts) {
      prefixBoostComponents.push(
        <FieldBoost
          key={field}
          data={
            additiveFieldBoost(
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
        <FieldBoost
          key={field}
          data={
            additiveFieldBoost(
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
        <BaseBody body={text} run={MOUNT_UPDATE} weight={1} namespace={namespace} />
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
}

Body.defaultProps = {
  text: '',
  minLength: 3,
  prefixBoosts: {},
  containsBoosts: {},
  namespace: 'default',
}

export default Body
