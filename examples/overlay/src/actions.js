export const OVERLAY_ACTIVE = 'OVERLAY_ACTIVE'
export const COMPLETION = 'COMPLETION'

export function enableOverlay() {
  return { type: OVERLAY_ACTIVE, data: { overlayActive: true } }
}

export function disableOverlay() {
  return { type: OVERLAY_ACTIVE, data: { overlayActive: false } }
}

export function setCompletion(completion) {
  return { type: COMPLETION, data: { completion } }
}
