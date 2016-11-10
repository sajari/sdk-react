import React from 'react'

import Sajari from './Sajari'

/**
 * Sample that has a function to enable the overlay.
 */
const SampleApp = ({ enableOverlay }) => (
  <div>
    <h1>Sajari Overlay</h1>
    <p>This provides a clean and familiar interface focused on the search experience.</p>
    <button onClick={enableOverlay}>Activate Overlay</button>
    <h2>Features</h2>
    <ul>
      <li>Instant Search as you type</li>
      <li>Results backed by smart textual analysis and machine learning</li>
      <li>Easy to use categories and filters</li>
    </ul>
    <Sajari/>
  </div>
)

export default SampleApp
