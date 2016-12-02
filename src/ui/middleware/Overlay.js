import { searchRequestReset, resetQueryTracking } from '../../api/actions/query'
import { SET_ACTIVE } from '../actions/Overlay'

const resetOverlayMiddleware = (namespaces = 'default') => (store) => (next) => (action) => {
  // Reset status of all namespaces if the overlay is closed
  if (action.type === SET_ACTIVE && action.active === false) {
    [].concat(namespaces).forEach(n => {
      store.dispatch(searchRequestReset(n))
      store.dispatch(resetQueryTracking(n))
    })
  }
  return next(action)
}

export { resetOverlayMiddleware }