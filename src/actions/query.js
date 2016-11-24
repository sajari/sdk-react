import * as Sajari from 'sajari'
import SearchComponents from '../constants/QueryComponentConstants'


export const NAMESPACE_ADD = 'NAMESPACE_ADD'
export const NAMESPACE_REMOVE = 'NAMESPACE_REMOVE'

export const addNamespace = (namespace, project, collection) => ({
  type: NAMESPACE_ADD,
  namespace,
  project,
  collection,
})

export const removeNamespace = (namespace) => ({
  type: NAMESPACE_REMOVE,
  namespace,
})


export const QUERY_COMPONENT_ADD = 'QUERY_COMPONENT_ADD'
export const QUERY_COMPONENT_MODIFY = 'QUERY_COMPONENT_MODIFY'
export const QUERY_COMPONENT_REMOVE = 'QUERY_COMPONENT_REMOVE'

export const addQueryComponent = (uuid, namespace, data, queryDataType) => ({
  type: QUERY_COMPONENT_ADD,
  uuid,
  namespace,
  data,
  queryDataType,
})

export const modifyQueryComponent = (uuid, namespace, data, queryDataType) => ({
  type: QUERY_COMPONENT_MODIFY,
  uuid,
  namespace,
  data,
  queryDataType,
})

export const removeQueryComponent = (uuid, namespace) => ({
  type: QUERY_COMPONENT_MODIFY,
  uuid,
  namespace,
})


export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS'
export const SEARCH_REQUEST_FAILURE = 'SEARCH_REQUEST_FAILURE'

export const searchRequest = (namespace) => ({
  type: SEARCH_REQUEST,
  namespace,
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


export const QUERY_TRACKING_SET = 'QUERY_TRACKING_SET'
export const QUERY_TRACKING_FLUSH = 'QUERY_TRACKING_FLUSH'

export const setQueryTracking = (namespace, data, id, sequence) => ({
  type: QUERY_TRACKING_SET,
  namespace,
  data,
  id,
  sequence,
})
export const flushQueryTracking = (namespace) => ({
  type: QUERY_TRACKING_FLUSH,
  namespace,
})


export const makeSearchRequest = (namespace) => (
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
        console.warn(`got PosNeg Tokens and Click tokens, use one or the other`)
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
        (state.query.queryTracking[namespace].id == query.i) &&
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
