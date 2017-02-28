import * as Sajari from 'sajari'

export const PIPELINE_ADD = 'PIPELINE_ADD'
export const PIPELINE_REMOVE = 'PIPELINE_REMOVE'

export const addPipeline = (namespace, pipeline) => ({
  type: PIPELINE_ADD,
  namespace,
  pipeline,
})

export const removePipeline = (namespace, pipeline) => ({
  type: PIPELINE_REMOVE,
  namespace,
  pipeline,
})


export const PIPELINE_VALUE_ADD = 'PIPELINE_VALUE_ADD'
export const PIPELINE_VALUE_MODIFY = 'PIPELINE_VALUE_MODIFY'
export const PIPELINE_VALUE_REMOVE = 'PIPELINE_VALUE_REMOVE'
export const PIPELINE_VALUE_NAMESPACE_CHANGE = 'PIPELINE_VALUE_NAMESPACE_CHANGE'

export const addPipelineValue = (namespace, pipeline, name, value) => ({
  type: PIPELINE_VALUE_ADD,
  namespace,
  pipeline,
  name,
  value,
})

export const modifyPipelineValue = (namespace, pipeline, name, value) => ({
  type: PIPELINE_VALUE_MODIFY,
  namespace,
  pipeline,
  name,
  value,
})

export const removePipelineValue = (namespace, pipeline, name) => ({
  type: PIPELINE_VALUE_REMOVE,
  namespace,
  pipeline,
  name,
})

export const changePipelineValueNamespace = (oldNamespace, newNamespace, pipeline, name) => ({
  type: PIPELINE_VALUE_NAMESPACE_CHANGE,
  newNamespace,
  oldNamespace,
  pipeline,
  name,
})


export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS'
export const SEARCH_REQUEST_FAILURE = 'SEARCH_REQUEST_FAILURE'
export const SEARCH_REQUEST_RESET = 'SEARCH_REQUEST_RESET'

export const searchRequest = (namespace, pipeline) => ({
  type: SEARCH_REQUEST,
  namespace,
  pipeline,
})
export const searchRequestSuccess = (namespace, pipeline, data) => ({
  type: SEARCH_REQUEST_SUCCESS,
  namespace,
  pipeline,
  data,
})
export const searchRequestFailure = (namespace, pipeline, error) => ({
  type: SEARCH_REQUEST_FAILURE,
  namespace,
  pipeline,
  error,
})
export const searchRequestReset = (namespace, pipeline) => ({
  type: SEARCH_REQUEST_RESET,
  namespace,
  pipeline,
})


export const QUERY_TRACKING_SET = 'QUERY_TRACKING_SET'
export const QUERY_TRACKING_RESET = 'QUERY_TRACKING_RESET'

export const setQueryTracking = (namespace, pipeline, data, id, sequence) => ({
  type: QUERY_TRACKING_SET,
  namespace,
  pipeline,
  data,
  id,
  sequence,
})
export const resetQueryTracking = (namespace, pipeline) => ({
  type: QUERY_TRACKING_RESET,
  namespace,
  pipeline,
})


export const makePipelineSearchRequest = (namespace, pipeline) => (
  (dispatch, getState) => {
    dispatch(searchRequest(namespace, pipeline))

    const state = getState()

    const trackingFromState = state.pipelines.pipelineTracking[`${namespace}|${pipeline}`]
    const tracking = new Sajari.Tracking()
    if (pipeline === 'website') {
      tracking.clickTokens('url')
    }

    if (trackingFromState) {
      tracking.data = trackingFromState.data
      tracking.i = trackingFromState.id,
      tracking.s = trackingFromState.sequence
    }


    const { project, collection } = state.pipelines.namespaces[namespace]
    const client = new Sajari.Client(project, collection)

    const values = state.pipelines.pipelineValue[`${namespace}|${pipeline}`]

    const searchPromise = client.searchPipeline(pipeline, values, tracking, (err, res) => {
      const state = getState()

      if (
        // There has been a previous query for this namespace
        (state.pipelines.pipelineTracking[`${namespace}|${pipeline}`]) &&
        // We're talking about the same query that's been used for this namespace
        (state.pipelines.pipelineTracking[`${namespace}|${pipeline}`].id === tracking.i) &&
        // The sequence in the store is more recent than the current query
        (state.pipelines.pipelineTracking[`${namespace}|${pipeline}`].sequence > tracking.s)
      ) {
        // Ignore the results of this query
        return
      }

      dispatch(
        err ? (
          searchRequestFailure(namespace, pipeline, err)
        ) : (
          searchRequestSuccess(namespace, pipeline, res)
        )
      )
    })

    dispatch(setQueryTracking(namespace, pipeline, tracking.data, tracking.i, tracking.s))

    return searchPromise
  }
)
