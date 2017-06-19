import React from 'react'
import { findDOMNode } from 'react-dom'

import { State, VALUES_CHANGED, RESULTS_CHANGED } from './state'

const RIGHT_ARROW_KEYCODE = 39
const TAB_KEYCODE = 9
const RETURN_KEYCODE = 13


const getState = (namespace) => {
  const s = State.ns(namespace);
  return {
    text: s.getValues()["q"] || "",
    completion: s.getResponseValues()["q"] || "",
  }
}

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = getState(this.props.namespace)
    this.setText = this.setText.bind(this)
    this.onValuesChange = this.onValuesChange.bind(this)
  }

  _state() {
    return State.ns(this.props.namespace);
  }

  componentDidMount() {
    findDOMNode(this.refs.searchInput).focus()

    this._state().registerListener(VALUES_CHANGED, this.onValuesChange)
    this._state().registerListener(RESULTS_CHANGED, this.onValuesChange)
  }

  componentWillUnmount() {
    this._state().unregisterListener(VALUES_CHANGED, this.onValuesChange)
    this._state().unregisterListener(RESULTS_CHANGED, this.onValuesChange)
  }

  onValuesChange() {
    this.setState(getState(this.props.namespace))
  }

  setText(text, override = false) {
    let x = {"q": text}
    x["q.override"] = override ? "true" : undefined;
    this._state().setValues(x, true);
  }

  render() {
    const { text, completion } = this.state
    const { placeHolder } = this.props

    return (
      <div id='sj-search-modal-input-holder-outer'>
        <div id='sj-search-modal-input-holder-inner'>
          <input
            type="text"
            id='sj-search-bar-completion'
            className='sj-search-bar-input-common'
            value={completion.indexOf(text) === 0 ? completion : text}
            readOnly
          />
          <input
            type="text"
            ref='searchInput'
            id='sj-search-bar-input'
            className='sj-search-bar-input-common'
            placeholder={placeHolder}
            value={text}
            onChange={e => this.setText(e.target.value)}
            onKeyDown={e => {
              if (e.keyCode === RETURN_KEYCODE) {
                e.preventDefault()
                this.setText(text, true)
              }
              if (!completion) { return }
              if (e.keyCode === TAB_KEYCODE || (e.keyCode === RIGHT_ARROW_KEYCODE && e.target.selectionStart === text.length)) {
                e.preventDefault()
                this.setText(completion)
              }
            }}
          />
        </div>
      </div>
    )
  }
}

AutocompleteInput.defaultProps = {
  namespace: 'default',
}

export default AutocompleteInput
