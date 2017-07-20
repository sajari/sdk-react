import React from 'react'
import { findDOMNode } from 'react-dom'

import { changeEvent } from "../controllers/values";
import { resultsEvent } from "../controllers/pipeline";

const RIGHT_ARROW_KEYCODE = 39
const TAB_KEYCODE = 9
const RETURN_KEYCODE = 13

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props)
    this.setText = this.setText.bind(this);
    this.valuesUpdated = this.valuesUpdated.bind(this);
    this.getState = this.getState.bind(this);
    this.state = this.getState();
  }

  getState() {
    const text = this.props.values.get().q || "";
    const responseValues = this.props.pipeline.getResponseValues();
    const completion = responseValues ? (responseValues.q || "") : "";
    return { text, completion };
  }

  componentDidMount() {
    if (this.props.focus) {
      findDOMNode(this.refs.searchInput).focus()
    }

    this.removeValuesListener = this.props.values.listen(changeEvent, this.valuesUpdated);
    this.removeResultsListener = this.props.pipeline.listen(resultsEvent, this.valuesUpdated);
  }

  componentWillUnmount() {
    this.removeValuesListener();
    this.removeResultsListener();
  }

  valuesUpdated() {
    this.setState(this.getState())
  }

  setText(text, override = false) {
    const textValues = {"q": text}
    textValues["q.override"] = override ? "true" : undefined;
    this.props.values.set(textValues);
    if (textValues.q) {
      this.props.pipeline.search();
    } else {
      this.props.pipeline.clearResults();
      this.props.pipeline.emitTrackingReset();
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

export default AutocompleteInput;
