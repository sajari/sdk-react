import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { Body } from '../../'

import { setBody, setCompletion } from './actions/Search'

import { REQUEST_SUCCEEDED } from '../../constants/RequestState'

const RIGHT_ARROW_KEYCODE = 39
const TAB_KEYCODE = 9

class bodyInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = { text: '' }

    this.setText = this.setText.bind(this)
  }

  componentDidMount() {
    findDOMNode(this.refs.searchInput).focus()
  }

  setText(text) {
    this.setState({ text })
    this.props.setBody(text)
  }

  render() {
    const { text } = this.state
    const { completion, ...others } = this.props

    return (
      <div id='sj-overlay-search-modal-input-holder-outer'>
        <div id='sj-overlay-search-modal-input-holder-inner'>
          <Body key={this.props.namespace} text={text} minLength={2} runOnUpdate={false} {...others} />
          <input
            type="text"
            id='sj-overlay-search-bar-completion'
            className='sj-overlay-search-bar-input-common'
            value={text.length > 0 && completion.indexOf(text) === 0 ? completion : ''}
            readOnly
          />
          <input
            type="text"
            ref='searchInput'
            id='sj-overlay-search-bar-input'
            className='sj-overlay-search-bar-input-common'
            value={text}
            onChange={e => this.setText(e.target.value)}
            onKeyDown={e => {
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

const BodyInput = connect(
  ({ search }) => ({ completion: search.completion }),
  (dispatch, props) => ({ setBody: body => dispatch(setBody(body, props.namespace)) }),
)(bodyInput)

BodyInput.defaultProps = {
  namespace: 'default',
}

class captureCompletion extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { status, data, completion } = this.props
    if (status !== REQUEST_SUCCEEDED) {
      return
    }
    try {
      const rewrittenBody = data.searchRequest.indexQuery.body[0].text
      if (rewrittenBody !== completion) {
        nextProps.setCompletion(rewrittenBody)
      }
    } catch (e) {
      nextProps.setCompletion('')
    }
  }

  render() { return null }
}

const CaptureCompletion = connect(
  ({ search }) => ({ completion: search.completion }),
  dispatch => ({ setCompletion: completion => dispatch(setCompletion(completion)) })
)(captureCompletion)

export { BodyInput, CaptureCompletion }
