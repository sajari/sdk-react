import * as Sajari from 'sajari'

import SearchComponents from '../constants/QueryComponentConstants'


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

export const addPipelineValue = (namespace, pipline, name, value) => ({
  type: PIPELINE_VALUE_ADD,
  namespace,
  pipline,
  name,
  value,
})

export const modifyPipelineValue = (namespace, pipline, name, value) => ({
  type: PIPELINE_VALUE_MODIFY,
  namespace,
  pipline,
  name,
  value,
})

export const removePipelineValue = (namespace, pipline, name) => ({
  type: PIPELINE_VALUE_REMOVE,
  namespace,
  pipline,
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
export const searchRequestSuccess = (namespace, data) => ({
  type: SEARCH_REQUEST_SUCCESS,
  namespace,
  data,
})
export const searchRequestFailure = (namespace, error) => ({
  type: SEARCH_REQUEST_FAILURE,
  namespace,
  error,
})
export const searchRequestReset = (namespace) => ({
  type: SEARCH_REQUEST_RESET,
  namespace
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


export const makeSearchRequest = (namespace = 'default') => (
  (dispatch, getState) => {
    dispatch(searchRequest(namespace))

    const state = getState()

    const components = (components => (
      Object.keys(components).reduce((acc, cur) => ({
        ...acc,
        [components[cur].type]: [ ...(acc[components[cur].type] || []), components[cur].data ],
      }), {})
    ))(state.query.queryComponent[namespace])

    const query = new Sajari.Query()

    const indexQuery = new Sajari.IndexQuery()
    if (components[SearchComponents.BODY]) {
      indexQuery.body(components[SearchComponents.BODY])
    }
    if (components[SearchComponents.INSTANCE_BOOSTS]) {
      indexQuery.instanceBoosts(components[SearchComponents.INSTANCE_BOOSTS])
    }
    if (components[SearchComponents.FIELD_BOOSTS]) {
      indexQuery.fieldBoosts(components[SearchComponents.FIELD_BOOSTS])
    }
    query.indexQuery(indexQuery)

    const featureQuery = new Sajari.FeatureQuery()
    if (components[SearchComponents.FEATURE_BOOST]) {
      featureQuery.fieldBoosts(components[SearchComponents.FEATURE_BOOST])
    }
    query.featureQuery(featureQuery)

    if (components[SearchComponents.FIELDS]) {
      query.fields(components[SearchComponents.FIELDS].reduce((a, b) => a.concat(b)))
    }
    const limit = components[SearchComponents.LIMIT]
    if (limit) {
      query.limit(limit[0])
      if (limit.length > 1) {
        console.warn(`got ${limit.length} limits defined, there should only be 1`)
      }
    }

    const offset = components[SearchComponents.OFFSET]
    if (offset) {
      query.offset(offset[0])
      if (offset.length > 1) {
        console.warn(`got ${offset.length} offsets defined, there should only be 1`)
      }
    }

    if (components[SearchComponents.TRANSFORM]) {
      query.transforms(components[SearchComponents.TRANSFORM])
    }
    if (components[SearchComponents.SORT]) {
      query.sort(components[SearchComponents.SORT])
    }

    const filters = components[SearchComponents.FILTER]
    if (filters) {
      query.filter(
        filters.length === 1 ? (
          filters[0]
        ) : (
          Sajari.allFilters(filters)
        )
      )
    }

    const clickTokens = components[SearchComponents.CLICK_TOKENS]
    const posNegTokens = components[SearchComponents.POS_NEG_TOKENS]
    if (clickTokens) {
      if (posNegTokens) {
        console.warn('got PosNeg Tokens and Click tokens, use one or the other')
      } else {
        query.clickTracking(clickTokens[0])
      }
    } else if (posNegTokens) {
      query.posNegTracking(posNegTokens[0])
    }

    if (components[SearchComponents.AGGREGATE]) {
      query.aggregates(components[SearchComponents.AGGREGATE])
    }

    const trackingFromState = state.query.queryTracking[namespace]
    if (trackingFromState) {
      query.data = trackingFromState.data
      query.i = trackingFromState.id,
      query.s = trackingFromState.sequence
    }

    const { project, collection } = state.query.namespaces[namespace]
    const client = new Sajari.Client(project, collection)

    const searchPromise = client.search(query, (err, res) => {
      const state = getState()

      if (
        // There has been a previous query for this namespace
        (state.query.queryTracking[namespace]) &&
        // We're talking about the same query that's been used for this namespace
        (state.query.queryTracking[namespace].id === query.i) &&
        // The sequence in the store is more recent than the current query
        (state.query.queryTracking[namespace].sequence > query.s)
      ) {
        // Ignore the results of this query
        return
      }

      dispatch(
        err ? (
          searchRequestFailure(namespace, err)
        ) : (
          searchRequestSuccess(namespace, res)
        )
      )
    })

    dispatch(setQueryTracking(namespace, query.data, query.i, query.s))

    return searchPromise
  }
)
