import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'


import Config from 'sajari-react/ui/Config'

import query from 'sajari-react/api/reducers/query'
import overlay from 'sajari-react/ui/reducers/Overlay'
import search from 'sajari-react/ui/reducers/Search'
import tabs from 'sajari-react/ui/reducers/Tabs'
import { setActive } from 'sajari-react/ui/actions/Overlay'
import { DefaultOverlay } from 'sajari-react/ui/Overlay'
import { resetPageMiddleware, searchMiddleware } from 'sajari-react/ui/middleware/Search'
import { resetOverlayMiddleware } from 'sajari-react/ui/middleware/Overlay'

import events from 'sajari-react/ui/middleware/Events'
import GoogleAnalytics from 'sajari-react/ui/Analytics/ga'

// import App from './App'

import 'sajari-react/ui/Search.css'
import 'sajari-react/ui/Overlay.css'

import './Override.css'

const store = createStore(
  combineReducers({ overlay, query, search, tabs }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware, resetOverlayMiddleware(), resetPageMiddleware, searchMiddleware, events(new GoogleAnalytics()))
)

store.dispatch(setActive(true))

const App = () => (
  <div>
    <Config
      namespace='default'
      project='sajariptyltd'
      collection='sajari-com'
    />
    <DefaultOverlay
      tabs={[]}
      logoUrl='https://www.sajari.com/img/sajari-100x100-flat.png'
      prefixBoosts={{
        'title': 0.05
      }}
      containsBoosts={{
        'title': 0.03
      }}
    />
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
