import React from 'react'
import { connect } from 'react-redux'

import Response from '../pipeline/Response'
import { setActive } from './actions/Overlay'
import { WrappedResults, PipelineSummary } from './Results'
// import Tabs from './Tabs'
//import Pipeline from '../pipeline/Pipeline'
// import Value from '../pipeline/Value'
// import PipelineInput from '../pipeline/PipelineInput'

const close = ({ onClick, closeOverlay }) => (
  <div
    id="sj-overlay-close"
    onClick={onClick ? e => onClick(e, closeOverlay) : closeOverlay}
  >
    <div className="sj-close">×</div>
    <div className="sj-esc">ESC</div>
  </div>
);

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

// const DefaultOverlay = ({ tabs, tabsOnChange, defaultTab, logoUrl, pipeline, resultsPerPage = 10 }) => (
//   <Overlay>
//     <Close />
//     <Pipeline name={pipeline}/>
//     <div id='sj-overlay-header'>
//       <Logo src={logoUrl} alt='Logo' />
//       <PipelineInput pipeline={pipeline} />
//     </div>
//     <Value pipeline={pipeline} name={'resultsPerPage'} value={''+resultsPerPage} />
//     <Tabs defaultTab={defaultTab} tabs={tabs} onChange={tabsOnChange} />
//     <Response pipeline={pipeline}>
//       <PipelineSummary pipeline={pipeline} />
//       <WrappedResults />
//     </Response>
//   </Overlay>
// )

export { Overlay, Logo, Close }
