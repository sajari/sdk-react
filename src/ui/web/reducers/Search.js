import { SET_COMPLETION, SET_BODY, SET_PAGE } from '../actions/Search'

const initialState = {
  completion: '',
  body: '',
  page: 1
}

function search(state = initialState, action) {
  switch (action.type) {
  case SET_COMPLETION: {
    return { ...state, completion: action.completion }
  }
  case SET_BODY: {
    return { ...state, body: action.body }
  }
  case SET_PAGE: {
    return { ...state, page: action.page }
  }
  default:
    return state
  }
}

export default search
