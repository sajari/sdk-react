import { SET_ACTIVE, SET_COMPLETION, SET_BODY, SET_TAB } from './actions'

const initialState = {
  active: false,
  completion: '',
  body: '',
  tab: 'all'
}

function overlay(state = initialState, action) {
  switch (action.type) {
  case SET_ACTIVE: {
    return { ...state, active: action.active }
  }
  case SET_COMPLETION: {
    return { ...state, completion: action.completion }
  }
  case SET_BODY: {
    return { ...state, body: action.body }
  }
  case SET_TAB: {
    return { ...state, tab: action.tab }
  }
  default:
    return state
  }
}

export default overlay
