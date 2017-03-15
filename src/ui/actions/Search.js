export const SET_COMPLETION = 'SEARCH_SET_COMPLETION'
export const SET_BODY = 'SEARCH_SET_BODY'
export const SET_PAGE = 'SEARCH_SET_PAGE'
export const SET_RESULTS_PER_PAGE = 'SEARCH_SET_RESULTS_PER_PAGE'
export const TRIGGER_SEARCH = 'SEARCH_TRIGGER'

export const setCompletion = (completion, namespace = 'default') => (
  { type: SET_COMPLETION, completion, namespace }
)

export const setBody = (body, namespace = 'default') => (
  { type: SET_BODY, body, namespace }
)

export const setPage = (page, namespace = 'default') => (
  { type: SET_PAGE, page, namespace }
)

export const setResultsPerPage = (resultsPerPage, namespace = 'default') => (
  { type: SET_RESULTS_PER_PAGE, resultsPerPage, namespace }
)

export const triggerSearch = (namespace = 'default', pipeline) => (
  { type: TRIGGER_SEARCH, namespace , pipeline }
)
