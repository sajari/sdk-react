import React from 'react'
import { findDOMNode } from 'react-dom'

import { changeEvent } from "sajari-react/state/values";
import { resultsEvent } from "sajari-react/state/pipeline";

import { values, pipeline } from "./resources";

const RIGHT_ARROW_KEYCODE = 39
const TAB_KEYCODE = 9
const RETURN_KEYCODE = 13

const getState = () => {
  const text = values.get().q || "";
  const responseValues = pipeline.getResponseValues();
  const completion = responseValues ? (responseValues.q || "") : "";
  return { text, completion };
}

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = getState()
    this.setText = this.setText.bind(this)
    this.valuesUpdated = this.valuesUpdated.bind(this)
  }

  componentDidMount() {
    // don't do this if it's not an overlay
    findDOMNode(this.refs.searchInput).focus()

    this.removeValuesListener = values.listen(changeEvent, this.valuesUpdated);
    this.removeResultsListener = pipeline.listen(resultsEvent, this.valuesUpdated);
  }

  componentWillUnmount() {
    this.removeValuesListener();
    this.removeResultsListener();
  }

  valuesUpdated() {
    this.setState(getState())
  }

  setText(text, override = false) {
    const textValues = {"q": text}
    textValues["q.override"] = override ? "true" : undefined;
    values.set(textValues);
    if (textValues.q) {
      pipeline.search();
    } else {
      pipeline.clearResults();
    }
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
