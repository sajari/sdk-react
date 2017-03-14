import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { modifyPipelineValue, makePipelineSearchRequest, searchRequestReset, resetQueryTracking } from '../api/actions/pipeline'
import { REQUEST_SUCCEEDED } from '../api/constants/RequestState'

const RIGHT_ARROW_KEYCODE = 39
const TAB_KEYCODE = 9
const RETURN_KEYCODE = 13

class pipelineInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: props.initialValue || '', completion: props.completion || '' }
    this.setText = this.setText.bind(this)
  }

  componentDidMount() {
    findDOMNode(this.refs.searchInput).focus()
    if (this.state.text) {
      this.props.setQ(this.state.text)
    }
  }

  setText(text, override = false) {
    if (text) {
      if (!text.startsWith(this.state.text.substr(0, 3))) {
        this.props.resetTracking()
      }
      this.props.setQ(text, override)
    } else {
      this.props.reset()
      this.props.resetTracking()
      this.setState({ completion: '' })
    }
    this.setState({ text })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === REQUEST_SUCCEEDED) {
      this.setState({ completion: nextProps.completion || '' })
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
            placeHolder={placeHolder}
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
          <div className="sj-search-icon" />
        </div>
      </div>
    )
  }
}

const PipelineInput = connect(
  ({ pipelines }, { namespace, pipeline }) => {
    let completion = ''
    let status = ''
    try {
      completion = pipelines.pipelineStatus[`${namespace}|${pipeline}`].data.values.q
    } catch (e) {}
    try {
      status = pipelines.pipelineStatus[`${namespace}|${pipeline}`].status
    } catch (e) {}
    return { completion, status }
  },
  (dispatch, { namespace, pipeline }) => ({
    setQ: (q, override = false) => {
      dispatch(modifyPipelineValue(namespace, pipeline, 'q', q))
      dispatch(makePipelineSearchRequest(namespace, pipeline, override ? { 'q.override': 'true' } : {} ))
    },
    reset: () => dispatch(searchRequestReset(namespace, pipeline)),
    resetTracking: () => dispatch(resetQueryTracking(namespace, pipeline))
  }),
)(pipelineInput)

PipelineInput.defaultProps = {
  namespace: 'default',
}

export default PipelineInput
