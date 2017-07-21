import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from "prop-types";

import Values, { changeEvent } from "../../controllers/values";
import Pipeline, { resultsEvent } from "../../controllers/pipeline";

const RIGHT_ARROW_KEYCODE = 39
const TAB_KEYCODE = 9
const RETURN_KEYCODE = 13

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props)
    this.setText = this.setText.bind(this);
    this.valuesUpdated = this.valuesUpdated.bind(this);
    this.getState = this.getState.bind(this);
    this.state = {
      ...this.getState(props.values, props.pipeline, props.qParam),
      qParam: props.qParam,
      qOverrideParam: props.qOverrideParam,
    };
  }

  getState(values, pipeline, qParam) {
    const text = values.get()[qParam] || "";
    const responseValues = pipeline.getResponseValues();
    const completion = responseValues ? (responseValues[qParam] || "") : "";
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
    this.setState(this.getState(this.props.values, this.props.pipeline, this.state.qParam));
  }

  setText(text, override = false) {
    const textValues = {
      [this.state.qParam] : text,
      [this.state.qOverrideParam]: override ? "true" : undefined,
    };
    this.props.values.set(textValues);
    if (textValues[this.state.qParam]) {
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

AutocompleteInput.propTypes = {
  values: PropTypes.instanceOf(Values).isRequired,
  pipeline: PropTypes.instanceOf(Pipeline).isRequired
}

AutocompleteInput.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
};

export default AutocompleteInput;
