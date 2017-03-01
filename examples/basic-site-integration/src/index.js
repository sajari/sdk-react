import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import pipelines from 'sajari-react/api/reducers/pipeline'

import App from './App'

function sjsi(config) {
  if (!config) {
    console.error('global value "_sjsi" not found, it is needed for Sajari Search Interface')
    return
  }

  const store = createStore(
    combineReducers({ pipelines }),
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
  )

  ReactDOM.render(
    <Provider store={store}>
      <App config={config}/>
    </Provider>,
    config.attachTarget
  )
}

sjsi(window._sjsi)
