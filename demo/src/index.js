import React from 'react'
import ReactDOM from 'react-dom'

import { RegisterNamespace } from '../../src/api-components'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Filter } from '../../src/api-components'
import { fieldFilter } from 'sajari'

import Config from '../../src/ui-components/web/Config'

import overlay from '../../src/ui-components/web/reducers/Overlay'
import search from '../../src/ui-components/web/reducers/Search'
import tabs from '../../src/ui-components/web/reducers/Tabs'
import { enableOverlay } from '../../src/ui-components/web/actions/Overlay'
import { DefaultOverlay } from '../../src/ui-components/web/Overlay'

import App from './App'

import '../../src/ui-components/web/Overlay.css'
import './Override.css'

import query from '../../src/reducers/query'

const store = createStore(
  combineReducers({ overlay, search, tabs, query }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunkMiddleware))

/**
 * Debugging - Start with overlay enabled
 */
store.dispatch(enableOverlay())

/**
 * FoxtelApp takes a function which enables the overlay when called.
 */
ReactDOM.render(
  <Provider store={store}>
  <App enableOverlay={() => store.dispatch(enableOverlay())}/></Provider>,
  document.getElementById('demo')
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
 * A Run component in Overlay is automatically triggered when tabs are changed.
 */
const All = ({ active }) => (
  <div>All</div>
)

const Blog = ({ active }) => (
  <div>
    Blog
    {active ? (<Filter data={fieldFilter('dir1', '=', 'blog')} />) : null}
  </div>
)

const Faq = ({ active }) => (
  <div>
    FAQ
    {active ? (<Filter data={fieldFilter('dir1', '=', 'faq')} />) : null}
  </div>
)

/**
 * Render the overlay into the new container div.
 */
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Config project='sajariptyltd' collection='sajari-com' />
      <DefaultOverlay
        tabs={[
          {name: "", tab: All},
          {name: "blog", tab: Blog},
          {name: "faq", tab: Faq},
        ]}
        logoUrl='https://www.sajari.com/img/sajari-100x100-flat.png'
      />
    </div>
  </Provider>,
  overlayContainer
)
