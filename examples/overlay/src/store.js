import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import overlay from 'sajari-react/ui/reducers/Overlay'
import query from 'sajari-react/api/reducers/query'
import search from 'sajari-react/ui/reducers/Search'
import tabs from 'sajari-react/ui/reducers/Tabs'

import { searchMiddleware, resetOverlayMiddleware } from 'sajari-react/ui/middleware/middleware'

function makeDefaultStore(extraReducers = {}, extraMiddleware = []) {
  return createStore(
    combineReducers({ overlay, query, search, tabs, ...extraReducers }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware, resetOverlayMiddleware('default'), searchMiddleware, ...extraMiddleware)
  )
}

export default makeDefaultStore
