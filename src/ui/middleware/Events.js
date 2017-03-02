import { SET_BODY } from '../actions/Search'
import { RESULT_CLICKED } from '../actions/Analytics'
import { SEARCH_REQUEST_SUCCESS } from '../../api/actions/query'

let data = {
  analyticsEnabled: false,
  body: ''
}

const events = (analytics) => {
  window.addEventListener('beforeunload', () => {
    if (data.analyticsEnabled && data.body) {
      analytics.onPageClose(data.body)
    }
  })

  return ({ getState }) => (next) => (action) => {
    if (action.type === SEARCH_REQUEST_SUCCESS) {
      data = {
        ...data,
        analyticsEnabled: true,
        body: (getState().search || {}).body,
      }
    }

    if (action.type === SET_BODY) {

      const previousBody = getState().search.body || ''
      const newBody = action.body

      if (previousBody.length >= 2 && newBody.length < 2) {
        if (data.analyticsEnabled && data.body) {
          analytics.onBodyReset(previousBody)
        }
        data = { ...data, body: '' }
      }
    }

    if (action.type === RESULT_CLICKED) {
      if (data.analyticsEnabled && data.body) {
        analytics.onResultClicked(getState().search.body)
      }
      data = { ...data, body: '' }
    }

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}


export default events
