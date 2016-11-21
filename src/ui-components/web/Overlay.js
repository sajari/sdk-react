import React from 'react'

import { connect } from 'react-redux'

import { disableOverlay } from './actions/Overlay'

import { BodyInput, CaptureCompletion } from './BodyInput'
import { BoostRules } from './Boosts'
import { Results } from './Results'
import Tabs from './Tabs'

import { ResultInjector } from 'sajari-react/api-components'

const close = ({ disableOverlay }) => (
  <div id='sj-overlay-close' onClick={disableOverlay}>
    <div className='sj-close'>&times;</div>
    <div className='sj-esc'>ESC</div>
  </div>
)

const Close = connect(
  null,
  dispatch => ({ disableOverlay: () => dispatch(disableOverlay()) })
)(close)

const logo = ({ disableOverlay, src, alt, className }) => (
  <div id='sj-overlay-logo'>
    <img id='sj-overlay-logo-image' onClick={disableOverlay} src={src} alt={alt} className={className} />
  </div>
)

const Logo = connect(
  null,
  dispatch => ({ disableOverlay: () => dispatch(disableOverlay()) })
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

const DefaultOverlay = ({ tabs, tabsOnChange, defaultTab, logoUrl }) => (
  <Overlay>
    <Close />
    <div id='sj-overlay-header'>
      <Logo src={logoUrl} alt='Logo' />
      <BodyInput />
      <BoostRules />
    </div>
    <div id='sj-overlay-filters'>
      <Tabs defaultTab={defaultTab} tabs={tabs} onChange={tabsOnChange} />
    </div>
    <ResultInjector>
      <CaptureCompletion />
      <Results />
    </ResultInjector>
  </Overlay>
)


export { DefaultOverlay, Overlay, Close, Logo }