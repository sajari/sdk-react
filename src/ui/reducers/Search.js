import { SET_COMPLETION, SET_BODY, SET_PAGE, SET_RESULTS_PER_PAGE } from '../actions/Search'
import { SEARCH_REQUEST_RESET } from '../../api/actions/query'

const initialState = {
  completion: '',
  body: '',
  page: 1,
  resultsPerPage: 10
}

function search(state = initialState, action) {
  switch (action.type) {
  case SET_COMPLETION:
    return { ...state, completion: action.completion }

  case SET_BODY:
    return { ...state, body: action.body }

  case SET_PAGE:
    return { ...state, page: action.page }

  case SET_RESULTS_PER_PAGE:
    return { ...state, resultsPerPage: action.resultsPerPage }

  case SEARCH_REQUEST_RESET:
    return { ...initialState }

  default:
    return state
  }
}

export default search
