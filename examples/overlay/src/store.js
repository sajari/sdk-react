import { OVERLAY_ACTIVE, COMPLETION } from './actions'

const initialState = {
  overlayActive: false,
  completion: '',
}

function overlay(state = initialState, action) {
  switch (action.type) {
  case OVERLAY_ACTIVE: {
    return { ...state, overlayActive: action.data.overlayActive }
  }
  case COMPLETION: {
    return { ...state, completion: action.data.completion }
  }
  default:
    return state
  }
}

export default overlay
