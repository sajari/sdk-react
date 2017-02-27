import { combineReducers } from 'redux'

import { NAMESPACE_ADD, NAMESPACE_REMOVE } from '../actions/query'

import {
  PIPELINE_ADD, PIPELINE_REMOVE,
  PIPELINE_VALUE_ADD, PIPELINE_VALUE_MODIFY, PIPELINE_VALUE_REMOVE, PIPELINE_VALUE_NAMESPACE_CHANGE,
  SEARCH_REQUEST, SEARCH_REQUEST_SUCCESS, SEARCH_REQUEST_FAILURE, SEARCH_REQUEST_RESET,
  QUERY_TRACKING_SET, QUERY_TRACKING_RESET,
} from '../actions/pipeline'
import { REQUEST_IN_PROGRESS, REQUEST_SUCCEEDED, REQUEST_FAILED } from '../constants/RequestState'

function namespaces(state = {}, action) {
  switch (action.type) {
  case NAMESPACE_ADD:
    return {
      ...state,
      [action.namespace]: {
        project: action.project,
        collection: action.collection,
      }
    }

  case NAMESPACE_REMOVE:
    // Break out namespace to be removed from state, return everything else
    const { [action.namespace]: _, ...rest } = state
    return rest

  default:
    return state
  }
}

function pipelines(state = {}, action) {
  switch (action.type) {
  case PIPELINE_ADD:
    return {
      ...state,
      [action.namespace]: action.pipeline,
    }
  case PIPELINE_REMOVE:
    const { [action.namespace]: _, ...rest } = state
    return rest
  default:
    return state
  }
}

function pipelineValue(state = {}, action) {
  switch (action.type) {
  case PIPELINE_VALUE_ADD:
  case PIPELINE_VALUE_MODIFY:
    return {
      ...state,
      [`${action.namespace}|${action.pipeline}`]: {
        ...state[`${action.namespace}|${action.pipeline}`],
        [action.name]: action.value,
      }
    }
  case PIPELINE_VALUE_REMOVE: {
    const { [action.name]: _, ...rest } = state[`${action.namespace}|${action.pipeline}`]
    return {
      ...state,
      [`${action.namespace}|${action.pipeline}`]: rest
    }
  }
  case PIPELINE_VALUE_NAMESPACE_CHANGE: {
    const { [action.name]: value, ...rest } = state[`${action.oldNamespace}|${action.pipeline}`]
    return {
      ...state,
      [`${action.oldNamespace}|${action.pipeline}`]: rest,
      [`${action.newNamespace}|${action.pipeline}`]: {
        ...state[`${action.Namespace}|${action.pipeline}`],
        [action.name]: value,
      }
    }
  }
  default:
    return state
  }
}

function pipelineStatus(state = {}, action) {
  switch (action.type) {
  case SEARCH_REQUEST:
    return {
      ...state,
      [`${action.namespace}|${action.pipeline}`]: {
        status: REQUEST_IN_PROGRESS,
      },
    }

  case SEARCH_REQUEST_SUCCESS:
    return {
      ...state,
      [`${action.namespace}|${action.pipeline}`]: {
        status: REQUEST_SUCCEEDED,
        data: action.data
      },
    }

  case SEARCH_REQUEST_FAILURE:
    return {
      ...state,
      [`${action.namespace}|${action.pipeline}`]: {
        status: REQUEST_FAILED,
        error: action.error,
      }
    }

  case SEARCH_REQUEST_RESET:
    const { [`${action.namespace}|${action.pipeline}`]: _, ...rest } = state
    return rest

  default:
    return state
  }
}

function pipelineTracking(state = {}, action) {
  switch (action.type) {
  case QUERY_TRACKING_SET: {
    const { namespace, ...rest } = action
    return {
      ...state,
      [`${namespace}|${action.pipeline}`]: rest,
    }
  }
  case QUERY_TRACKING_RESET: {
    const { [`${action.namespace}|${action.pipeline}`]: _, ...rest } = state
    return rest
  }
  default:
    return state
  }
}

const pipeline = combineReducers({ namespaces, pipelines, pipelineValue, pipelineStatus, pipelineTracking })

export default pipeline
