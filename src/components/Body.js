import React, { Component } from 'react'

import { fieldFilter, FILTER_OP_HAS_PREFIX, FILTER_OP_CONTAINS } from 'sajari'

import { default as BaseBody } from '../api-components/Body'
import Page from '../api-components/Page'
import { FilterFieldBoost } from '../api-components'
import { ALL } from '../constants/RunModes'

class InputBody extends Component {
  constructor() {
    this.state = {
      text: this.props.text
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(evt) {
    const v = evt.target.value
    if (v.length === 0 || !this.state.text.startswith(v.slice(0, 3))) {
      SearchActions.resetTracking()
    }
    this.setState({
      text: v
    })
  }

  render() {
    // Take out text to prevent it going into others
    const { text as _, minLength, prefixBoosts, containsBoosts, namespace, ...others } = this.props
    return (
      <div>
        <input type="text" onChange={this.onChange} {...others} />
        <Body
          text={this.state.text}
          minLength={minLength}
          prefixBoosts={prefixBoosts}
          containsBoosts={containsBoosts}
          namespace={namespace}
        />
      </div>
    )

  }
}

class Body extends Component {
  constructor(props) {
    super(props)

    this.onPageChange = this.onPageChange.bind(this)
  }

  shouldComponentUpdate(newProps) {
    // Don't update the component if the text doesn't satisfy the minimum length
    return newProps.text.length >= newProps.minLength
  }

  componentDidMount() {
    PageStore.AddChangeListener(this.onPageChange)
  }

  componentWillUnmount() {
    PageStore.RemoveChangeListener(this.onPageChange)
  }

  onPageChange() {
    this.setState({
      page: PageStore.get()
    })
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

    return (
      <div>
        {prefixBoostComponents}
        {containsBoostComponents}
        <Page page={this.state.page} namespace={namespace} />
        <BaseBody body={text} run={ALL} weight={1} namespace={namespace} trackingResetTrigger={trackingResetFns} />
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
