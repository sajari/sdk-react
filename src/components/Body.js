import React, { Component } from 'react'

import { fieldFilter, FILTER_OP_HAS_PREFIX, FILTER_OP_CONTAINS } from 'sajari'

import { default as BaseBody } from '../api-components/Body'
import Page from '../api-components/Page'
import { FilterFieldBoost } from '../api-components'
import { ALL } from '../constants/RunModes'

function shouldResetTracking(text, oldText) {
  return text.length === 0 || !text.startsWith(oldText.slice(0, 3))
}

class Body extends Component {
  shouldComponentUpdate(newProps) {
    // Don't update the component if the text doesn't satisfy the minimum length
    return newProps.text.length >= newProps.minLength
  }

  trackingReset(nextProps) {
    return shouldResetTracking(this.props.text, nextProps.text)
  }

  componentDidMount() {
    PageStore.AddChangeListener(this.onPageChange)
    QueryDataStore.AddTrackingResetListener(this.onTrackingReset)
  }

  componentWillUnmount() {
    PageStore.RemoveChangeListener(this.onPageChange)
    QueryDataStore.RemoveTrackingResetListener(this.onTrackingReset)
  }

  onPageChange() {
    this.setState({
      page: PageStore.get(this.props.namespace)
    })
  }

  onTrackingReset() {
    PageActions.SetPage(this.props.namespace, 1)
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
        <FilterFieldBoost
          key={field}
          filter={fieldFilter(field, text, FILTER_OP_HAS_PREFIX)}
          value={prefixBoosts[field]}
          namespace={namespace}
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
          namespace={namespace}
        />
      )
    }

    const trackingResetFns = {
      "UPDATE": this.trackingReset,
    }

    return (
      <div>
        {prefixBoostComponents}
        {containsBoostComponents}
        <Page page={this.state.page} namespace={namespace} />
        <BaseBody body={text} run={ALL} weight={1} namespace={namespace} runIfSame={true} trackingResetTrigger={trackingResetFns} />
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
