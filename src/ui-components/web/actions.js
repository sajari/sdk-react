export const SET_ACTIVE = 'OVERLAY_SET_ACTIVE'
export const SET_COMPLETION = 'OVERLAY_SET_COMPLETION'
export const SET_BODY = 'OVERLAY_SET_BODY'
export const SET_TAB = 'OVERLAY_SET_TAB'

export const enableOverlay = () => (
  { type: SET_ACTIVE, active: true }
)

export const disableOverlay = () => (
  { type: SET_ACTIVE, active: false }
)

export const setCompletion = (completion) => (
  { type: SET_COMPLETION, completion }
)

export const setBody = (body) => (
  { type: SET_BODY, body }
)

export const setTab = (tab) => (
  { type: SET_TAB, tab }
)
