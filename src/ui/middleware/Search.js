import {
  searchRequestReset, resetQueryTracking, makeSearchRequest,
  QUERY_COMPONENT_ADD, QUERY_COMPONENT_MODIFY, QUERY_COMPONENT_REMOVE
} from '../../api/actions/query'
import QueryConstants  from '../../api/constants/QueryComponentConstants'
import { TRIGGER_SEARCH, setPage } from '../actions/Search'


const resetPageMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case QUERY_COMPONENT_ADD:
    case QUERY_COMPONENT_MODIFY:
    case QUERY_COMPONENT_REMOVE:
      if (action.queryDataType !== QueryConstants.OFFSET && action.queryDataType !== QueryConstants.LIMIT) {
        /* Reset page to 1 for any query changes */
        store.dispatch(setPage(1))
      }
      break
    default:
      break
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

export { resetPageMiddleware, searchMiddleware }
