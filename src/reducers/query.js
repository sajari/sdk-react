// @flow
import { combineReducers } from 'redux'

import {
  NAMESPACE_ADD, NAMESPACE_REMOVE,
  QUERY_COMPONENT_ADD, QUERY_COMPONENT_MODIFY, QUERY_COMPONENT_REMOVE,
  SEARCH_REQUEST, SEARCH_REQUEST_SUCCESS, SEARCH_REQUEST_FAILURE,
  QUERY_TRACKING_SET, QUERY_TRACKING_FLUSH,
} from '../actions/query'

function namespaces(state: Object = {}, action: Object): Object {
  switch (action.type) {
    case NAMESPACE_ADD: {
      return {
        ...state,
        [action.namespace]: {
          project: action.project,
          collection: action.collection,
        }
      }
    }
    case NAMESPACE_REMOVE: {
      // Break out namespace to be removed from state, return everything else
      const { [action.namespace]: _, ...rest } = state
      return rest
    }
    default: {
      return state
    }
  }
}

function queryComponent(state: Object = {}, action: Object): Object {
  switch (action.type) {
    case QUERY_COMPONENT_ADD:
    case QUERY_COMPONENT_MODIFY: {
      return {
        ...state,
        [action.namespace]: {
          ...state[action.namespace],
          [action.uuid]: {
            type: action.queryDataType,
            data: action.data,
          },
        }
      }
    }
    case QUERY_COMPONENT_REMOVE: {
      const { [action.uuid]: _, ...rest } = state[action.namespace]
      return {
        ...state,
        [action.namespace]: rest
      }
    }
    default: {
      return state
    }
  }
}

function queryStatus(state: Object = {}, action: Object): Object {
  switch (action.type) {
    case SEARCH_REQUEST: {
      return {
        ...state,
        [action.namespace]: {
          status: 'in-progress',
        },
      }
    }
    case SEARCH_REQUEST_SUCCESS: {
      return {
        ...state,
        [action.namespace]: {
          status: 'success',
          data: action.data
        },
      }
    }
    case SEARCH_REQUEST_FAILURE: {
      return {
        ...state,
        [action.namespace]: {
          status: 'failed',
          error: action.error,
        }
      }
    }
    default: {
      return state
    }
  }
}

function queryTracking(state = {}, action) {
  switch (action.type) {
    case QUERY_TRACKING_SET: {
      const { namespace, type, ...rest } = action
      return {
        ...state,
        [namespace]: rest,
      }
    }
    case QUERY_TRACKING_FLUSH: {
      const { [action.namespace]: _, ...rest } = state
      return rest
    }
    default: {
      return state
    }
  }
}

const query = combineReducers({ namespaces, queryComponent, queryStatus, queryTracking })

export default query
