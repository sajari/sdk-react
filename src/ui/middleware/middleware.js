import {
  searchRequestReset, resetQueryTracking, makeSearchRequest,
  QUERY_COMPONENT_ADD, QUERY_COMPONENT_MODIFY, QUERY_COMPONENT_REMOVE
} from '../../api/actions/query'
import QueryConstants  from '../../api/constants/QueryComponentConstants'
import { TRIGGER_SEARCH } from '../actions/Search'
import { SET_ACTIVE } from '../actions/Overlay'

const resetOverlayMiddleware = (namespaces) => (store) => (next) => (action) => {
  // Reset status of all namespaces if the overlay is closed
  if (action.type === SET_ACTIVE && action.active === false) {
    [].concat(namespaces).forEach(n => {
      store.dispatch(searchRequestReset(n))
      store.dispatch(resetQueryTracking(n))
    })
  }
  return next(action)
}

const searchMiddleware = (store) => (next) => (action) => {
  if (action.type !== TRIGGER_SEARCH) {
    return next(action)
  }

  if (store.getState().search.body.length < 2) {
    store.dispatch(searchRequestReset(action.namespace))
    store.dispatch(resetQueryTracking(action.namespace))
    return
  }

  // Swallow the action in this middleware
  store.dispatch(makeSearchRequest(action.namespace))
}

export { resetOverlayMiddleware, searchMiddleware }
