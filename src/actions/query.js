// @flow
import { Client, Query } from 'sajari'

export const NAMESPACE_ADD = 'NAMESPACE_ADD'
export const NAMESPACE_REMOVE = 'NAMESPACE_REMOVE'

export const QUERY_COMPONENT_ADD = 'QUERY_COMPONENT_ADD'
export const QUERY_COMPONENT_MODIFY = 'QUERY_COMPONENT_MODIFY'
export const QUERY_COMPONENT_REMOVE = 'QUERY_COMPONENT_REMOVE'

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS'
export const SEARCH_REQUEST_FAILURE = 'SEARCH_REQUEST_FAILURE'

export const addNamespace = (namespace: string, project: string, collection: string) => ({
  type: NAMESPACE_ADD,
  namespace,
  project,
  collection,
})
export const removeNamespace = (namespace: string) => ({
  type: NAMESPACE_REMOVE,
  namespace,
})

export const addQueryComponent = (uuid: string, namespace: string, data: Object, queryDataType: string) => ({
  type: QUERY_COMPONENT_ADD,
  uuid,
  namespace,
  data,
  queryDataType,
})
export const modifyQueryComponent = (uuid: string, namespace: string, data: Object, queryDataType: string) => ({
  type: QUERY_COMPONENT_MODIFY,
  uuid,
  namespace,
  data,
  queryDataType,
})
export const removeQueryComponent = (uuid: string, namespace: string) => ({
  type: QUERY_COMPONENT_MODIFY,
  uuid,
  namespace,
})

export const searchRequest = (namespace: string) => ({
  type: SEARCH_REQUEST,
  namespace,
})
export const searchRequestSuccess = (namespace: string, data: Object) => ({
  type: SEARCH_REQUEST_SUCCESS,
  namespace,
  data,
})
export const searchRequestFailure = (namespace: string, message: string) => ({
  type: SEARCH_REQUEST_FAILURE,
  namespace,
  message,
})
export const makeSearchRequest = (namespace: string, request) => (
  (dispatch, getState) => {
    dispatch(searchRequest(namespace))

    const state = getState()

    const { project, collection } = state.query.namespaces[namespace]

    const client = new Client(project, collection)
    const query = new Query()
    return client.search(query, (err, res) => {
      if (err) {
        dispatch(searchRequestFailure(namespace, err))
      } else {
        dispatch(searchRequestSuccess(namespace, res))
      }
    })
  }
)
