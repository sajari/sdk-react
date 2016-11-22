import React from 'react'

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
  </div>
)

export default App
