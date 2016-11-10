import React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { Filter, Run } from 'sajari-react/api-components'
import { fieldFilter } from 'sajari'

import overlay from './store'
import { enableOverlay } from './actions'

import SampleApp from './SampleApp'
import Overlay from './Overlay'

const store = createStore(overlay)

/**
 * SampleApp takes a function which enables the overlay when called.
 */
render(
  <SampleApp enableOverlay={() => store.dispatch(enableOverlay())}/>,
  document.getElementById('sample-app')
)

/**
 * A div is appended to the body of the page to be used as the container for the overlay.
 */
const overlayContainer = document.createElement('div')
overlayContainer.id = 'sj-overlay-holder'
document.body.appendChild(overlayContainer)

/**
 * Tab renderers.
 * They will get 'active' as a boolean prop indicating if they are currently selected.
 */
const All = ({ active }) => <div>All</div>
const Blog = ({ active }) => (
  <div>
    Blog
    {active ? (
      <div>
        <Filter data={fieldFilter('dir1', '=', 'blog')}/>
        <Run runOnUnmount={false}/>
      </div>
    ) : null}
  </div>
)
const Faq = ({ active }) => (
  <div>
    Faq
    {active ? (
      <div>
        <Filter data={fieldFilter('dir1', '=', 'faq')}/>
        <Run runOnUnmount={false}/>
      </div>
    ) : null}
  </div>
)

/**
 * Render the overlay into the new container div.
 */
render(
  <Provider store={store}>
    <Overlay
      tabs={[All, Blog, Faq]}
    />
  </Provider>,
  overlayContainer
)
