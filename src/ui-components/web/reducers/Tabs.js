import { SET_TAB } from '../actions/Tabs'

const initialState = { tab: '' }

function tabs(state = initialState, action) {
  switch (action.type) {
  case SET_TAB: {
    return { ...state, tab: action.tab }
  }
  default:
    return state
  }
}

export default tabs
