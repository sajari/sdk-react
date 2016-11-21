import { SET_ACTIVE } from '../actions/Overlay'

const initialState = { active: false }

function overlay(state = initialState, action) {
  switch (action.type) {
  case SET_ACTIVE: {
    return { ...state, active: action.active }
  }
  default:
    return state
  }
}

export default overlay
