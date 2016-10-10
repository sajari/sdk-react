import React, { Component } from 'react'

import SearchActions from '../../actions/SearchActions'
import Body from '../../components/Body'
import PageActions from '../../actions/PageActions'
import PageStore from '../../stores/PageStore'

class BodyInput extends Component {
  constructor(props) {
    super(props)
    this.state = { text: props.text }
    this.onChange = this.onChange.bind(this)
  }

  onChange(evt) {
    const text = evt.target.value
    if (text.length === 0 || !this.state.text.startsWith(text.slice(0, 3))) {
      SearchActions.resetTracking()
    }
    if (text !== this.state.text && PageStore.get(this.props.namespace) !== 1) {
      PageActions.set(this.props.namespace, 1)
    }
    this.setState({ text })
  }

  render() {
    // Take out text to prevent it going into others
    const { text: _, minLength, prefixBoosts, containsBoosts, namespace, ...others } = this.props
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

BodyInput.propTypes = {
  text: React.PropTypes.string.isRequired,
  minLength: React.PropTypes.number,
  prefixBoosts: React.PropTypes.object,
  containsBoosts: React.PropTypes.object,
  namespace: React.PropTypes.string,
}

BodyInput.defaultProps = {
  text: '',
  minLength: 3,
  prefixBoosts: {},
  containsBoosts: {},
  namespace: 'default',
}

export default BodyInput;
