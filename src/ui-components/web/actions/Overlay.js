export const SET_ACTIVE = 'OVERLAY_SET_ACTIVE'

export const enableOverlay = () => (
  { type: SET_ACTIVE, active: true }
)

export const disableOverlay = () => (
  { type: SET_ACTIVE, active: false }
)
