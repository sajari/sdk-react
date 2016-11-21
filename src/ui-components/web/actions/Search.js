export const SET_COMPLETION = 'SEARCH_SET_COMPLETION'
export const SET_BODY = 'SEARCH_SET_BODY'
export const SET_PAGE = 'SEARCH_SET_PAGE'

export const setCompletion = (completion) => (
  { type: SET_COMPLETION, completion }
)

export const setBody = (body) => (
  { type: SET_BODY, body }
)

export const setPage = (page) => (
  { type: SET_PAGE, page }
)
