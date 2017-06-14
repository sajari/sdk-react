import React from 'react'

import Response from '../pipeline/Response'
import { setActive } from './actions/Overlay'
import { Results } from './Results'

const Close = ({ onClick, closeOverlay }) => (
  <div
    id="sj-overlay-close"
    onClick={onClick ? e => onClick(e, closeOverlay) : closeOverlay}
  >
    <div className="sj-close">×</div>
    <div className="sj-esc">ESC</div>
  </div>
);

const Logo = ({ closeOverlay, src, alt, className }) => (
  <div id='sj-overlay-logo'>
    <img id='sj-overlay-logo-image' onClick={closeOverlay} src={src} alt={alt} className={className} />
  </div>
)

const Overlay = ({ active, children }) => {
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

export { Overlay, Logo, Close }
