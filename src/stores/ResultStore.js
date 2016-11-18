import equal from 'deep-equal';

import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher';
import SearchConstants from '../constants/SearchConstants.js';
import RequestStore from './RequestStore.js';

let data = {}

class ResultStore extends ChangeEmitter {
  get(namespace) {
    return data[namespace]
  }
}

function setSearchResults(namespace, results = {}) {
  data = {
    ...data,
    [namespace]: {
      results: results.searchResponse.results,
      response: {
        totalResults: results.totalResults,
        time: results.time,
        reads: results.reads,
        searchRequest: results.searchRequest,
        error: null,
      },
      aggregates: results.aggregates,
    }
  }
}

function setSearchError(namespace, msg) {
  data = {
    ...data,
    [namespace]: {
      ...data[namespace],
      response: {
        error: msg,
      }
    }
  }
}

const resultStore = new ResultStore();

function isLatestQuery(query, namespace) {
  return equal(query, RequestStore.getRequest(namespace))
}

resultStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === 'SERVER_ACTION') {
    if (!action.actionData) {
      // Request was cancelled
      return
    }

    if (!isLatestQuery(action.searchQuery, action.namespace)) {
      // Results came back that didn't match the current query state, so we disregard them.
      // This is caused by results coming back out of order, usually due to networking issues.
      return
    }

    switch (action.actionType) {
      case SearchConstants.SEARCH: {
        setSearchResults(action.namespace, action.actionData);
        resultStore.emitChange();
        break;
      }
      case SearchConstants.SEARCH_ERROR: {
        setSearchError(action.namespace, action.actionData)
        resultStore.emitChange()
        break
      }
      default:
        break;
    }
  }

  if (source === 'VIEW_ACTION') {
    if (action.actionType === SearchConstants.CLEAR_RESULTS) {
      data = {
        ...data,
        [action.namespace]: {
          ...data[action.namespace],
          results: null,
        }
      }
      resultStore.emitChange()
    }
  }
});

export default resultStore;
