export const OVERLAY_ACTIVE = 'OVERLAY_ACTIVE'
export const COMPLETION = 'COMPLETION'
export const SET_BODY = 'SET_BODY'

export function enableOverlay() {
  return { type: OVERLAY_ACTIVE, data: { overlayActive: true } }
}

export function disableOverlay() {
  return { type: OVERLAY_ACTIVE, data: { overlayActive: false } }
}

export function setCompletion(completion) {
  return { type: COMPLETION, data: { completion } }
}

export function setBody(body) {
  return { type: SET_BODY, data: { body } }
}
