import React from 'react'
import { connect } from 'react-redux'

import { Response } from '../api'
import { setActive } from './actions/Overlay'
import { BodyInput, CaptureCompletion } from './BodyInput'
import { BoostRules } from './Boosts'
import { Results } from './Results'
import Tabs from './Tabs'
import { triggerSearch } from './actions/Search'

const close = ({ closeOverlay }) => (
  <div id='sj-overlay-close' onClick={closeOverlay}>
    <div className='sj-close'>&times;</div>
    <div className='sj-esc'>ESC</div>
  </div>
)

const Close = connect(
  null,
  dispatch => ({ closeOverlay: () => dispatch(setActive(false)) })
)(close)

const logo = ({ closeOverlay, src, alt, className }) => (
  <div id='sj-overlay-logo'>
    <img id='sj-overlay-logo-image' onClick={closeOverlay} src={src} alt={alt} className={className} />
  </div>
)

const Logo = connect(
  null,
  dispatch => ({ closeOverlay: () => dispatch(setActive(false)) })
)(logo)

const overlay = ({ active, children }) => {
  if (!active) {
    return null
  }

  return (
    <div id='sj-overlay'>
      <div id='sj-overlay-search-modal'>
        {children}
      </div>
    </div>
  )
}

const Overlay = connect(
  ({ overlay }) => ({ active: overlay.active })
)(overlay)

class wrappedBodyInput extends React.Component {
  componentDidUpdate() {
    this.props.triggerSearch()
  }

  render() {
    return (
      <BodyInput
        prefixBoosts={this.props.prefixBoosts}
        containsBoosts={this.props.containsBoosts}
      />
    )
  }
}

const WrappedBodyInput = connect(
  ({ search }) => ({ body: search.body }),
  (dispatch) => ({ triggerSearch: () => dispatch(triggerSearch('default')) })
)(wrappedBodyInput)

const DefaultOverlay = ({ tabs, tabsOnChange, defaultTab, logoUrl, prefixBoosts, containsBoosts }) => (
  <Overlay>
    <Close />
    <div id='sj-overlay-header'>
      <Logo src={logoUrl} alt='Logo' />
      <WrappedBodyInput prefixBoosts={prefixBoosts} containsBoosts={containsBoosts} />
      <BoostRules />
    </div>
    <Tabs defaultTab={defaultTab} tabs={tabs} onChange={tabsOnChange} />
    <Response>
      <CaptureCompletion />
      <Results />
    </Response>
  </Overlay>
)


export { DefaultOverlay, Overlay, Close, Logo }
