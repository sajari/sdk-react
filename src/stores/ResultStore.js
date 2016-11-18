import { fromJS, List as list } from 'immutable';
import equal from 'deep-equal';

import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher';
import SearchConstants from '../constants/SearchConstants.js';
import RequestStore from './RequestStore.js';

const nameDefault = 'default';

// let protectFacets = false; // switch to keep facets from original search around for rendering

let data = fromJS({
  default: {
    results: [],
    page: 1,
    response: {
      reads: 0,
      totalResults: 0,
      time: 0,
      statusCode: 0,
      queryID: '',
      error: '',
      searchRequest: {},
    },
    facets: {},
    fuzzy: '',
    aggregates: {},
  },
});

function updateResponse(namespace, result) {
  data = data.setIn([namespace, 'response', 'totalResults'], Number(result.totalResults));
  data = data.setIn([namespace, 'response', 'time'], result.time);
  data = data.setIn([namespace, 'response', 'reads'], Number(result.reads));
  data = data.setIn([namespace, 'aggregates'], result.aggregates);
  data = data.setIn([namespace, 'response', 'searchRequest'], result.searchRequest || {})
}

function getResponse(namespace, ) {
  return data.getIn([namespace, 'response']);
}

// Store for holding search results
class ResultStore extends ChangeEmitter {

  getResults(namespace) {
    return data.getIn([namespace, 'results'])
  }

  getAggregates(namespace) {
    return data.getIn([namespace, 'aggregates'])
  }

  getResponse(namespace) {
    return getResponse(namespace);
  }

  getReads(namespace) {
    return data.getIn([namespace, 'response', 'reads'])
  }

  getTotalResults(namespace) {
    return data.getIn([namespace, 'response', 'totalResults'])
  }

  getTime(namespace) {
    return data.getIn([namespace, 'response', 'time'])
  }

  getStatusCode(namespace) {
    return data.getIn([namespace, 'response', 'statusCode'])
  }

  getQueryID(namespace) {
    return data.getIn([namespace, 'response', 'queryID'])
  }

  getFuzzy(namespace) {
    return data.getIn([namespace, 'response', 'fuzzy'])
  }
}

function setSearchResults(namespace, results) {
  data = data.setIn([namespace, 'results'], list(results.searchResponse.results))
  const response = results.searchResponse || {}
  response.searchRequest = results.searchRequest
  updateResponse(namespace, response);
  data = data.setIn([namespace, 'response', 'error'], null)
}

function setSearchError(namespace, msg) {
  data = data.setIn([namespace, 'response', 'error'], msg)
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
      data = data.setIn([action.namespace, 'results'], null)
      resultStore.emitChange()
    }
  }
});

export default resultStore;
