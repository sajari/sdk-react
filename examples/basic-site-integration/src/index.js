import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import pipelines from 'sajari-react/api/reducers/pipeline'
import search from 'sajari-react/ui/reducers/Search'
import { resetPipelinePageMiddleware, searchPipelineMiddleware } from 'sajari-react/ui/middleware/Search'
import GoogleAnalytics from 'sajari-react/ui/Analytics/ga'
import AnalyticsEvents from 'sajari-react/ui/middleware/Events'

import App from './App'

function sjsi(config) {
  if (!config) {
    console.error('global value "_sjsi" not found, it is needed for Sajari Search Interface')
    return
  }

  const store = createStore(
    combineReducers({ pipelines, search }),
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware, resetPipelinePageMiddleware, searchPipelineMiddleware, AnalyticsEvents(new GoogleAnalytics()))
  )

  ReactDOM.render(
    <Provider store={store}>
      <App config={config}/>
    </Provider>,
    config.attachTarget
  )
}

sjsi(window._sjsi)
