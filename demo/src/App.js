import React from 'react'

import Config from '../../src/ui-components/web/Config'

/**
 * Sample that has a function to enable the overlay.
 */
const App = ({ enableOverlay }) => (
  <div>
    <input
      onFocus={enableOverlay}
      type='search'
      className='top-search-text'
      id='top-search-text'
      value='Search'
      readOnly
    />
    <Config project='sajariptyltd' collection='sajari-com' />
  </div>
)

export default App
