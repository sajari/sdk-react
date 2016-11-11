import { OVERLAY_ACTIVE, COMPLETION, SET_BODY } from './actions'

const initialState = {
  overlayActive: false,
  completion: '',
  body: '',
}

function overlay(state = initialState, action) {
  switch (action.type) {
  case OVERLAY_ACTIVE: {
    return { ...state, overlayActive: action.data.overlayActive }
  }
  case COMPLETION: {
    return { ...state, completion: action.data.completion }
  }
  case SET_BODY: {
    return { ...state, body: action.data.body }
  }
  default:
    return state
  }
}

export default overlay
