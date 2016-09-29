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
      totalMatches: 0,
      msecs: 0,
      statusCode: 0,
      queryID: '',
    },
    facets: {},
    fuzzy: '',
    aggregates: {},
  },
});

function setResults(namespace, r) {
  data = data.setIn([namespace, 'results'], r);
}

function getResults(namespace) {
  return data.getIn([namespace, 'results']);
}

function setAggregates(namespace, a) {
  data = data.setIn([namespace, 'aggregates'], a);
}

function getAggregates(namespace) {
  return data.getIn([namespace, 'aggregates']);
}

function setReads(namespace, r) {
  data = data.setIn([namespace, 'response', 'reads'], r);
}

function getReads(namespace) {
  return data.getIn([namespace, 'response', 'reads']);
}

function setTotalMatches(namespace, t) {
  data = data.setIn([namespace, 'response', 'totalMatches'], t);
}

function getTotalMatches(namespace, ) {
  return data.getIn([namespace, 'response', 'totalMatches']);
}

function setMsecs(namespace, m) {
  data = data.setIn([namespace, 'response', 'msecs'], m);
}

function getMsecs(namespace,) {
  return data.getIn([namespace, 'response', 'msecs']);
}

function setStatusCode(namespace, c) {
  data = data.setIn([namespace, 'response', 'statusCode'], c);
}

function getStatusCode(namespace) {
  return data.getIn([namespace, 'response', 'statusCode']);
}

function setQueryID(namespace, qid) {
  data = data.setIn([namespace, 'response', 'queryID'], qid);
}

function getQueryID(namespace) {
  return data.getIn([namespace, 'response', 'queryID']);
}

function setFuzzy(namespace, f) {
  data = data.setIn([namespace, 'response', 'fuzzy'], f || '');
}

function getFuzzy(namespace) {
  return data.getIn([namespace, 'response', 'fuzzy']);
}

function updateResponse(namespace, result) {
  setTotalMatches(namespace, Number(result.totalResults));
  setMsecs(namespace, result.time);
  setReads(namespace, Number(result.reads));
  setAggregates(namespace, result.aggregates);
}

function getResponse(namespace, ) {
  return data.getIn([namespace, 'response']);
}

// Store for holding search results
class ResultStore extends ChangeEmitter {

  getResults(namespace) {
    return getResults(namespace);
  }

  getAggregates(namespace) {
    return getAggregates(namespace);
  }

  getResponse(namespace) {
    return getResponse(namespace);
  }

  getReads() {
    return getReads();
  }

  getTotalMatches() {
    return getTotalMatches();
  }

  getMsecs() {
    return getMsecs();
  }

  getStatusCode() {
    return getStatusCode();
  }

  getQueryID() {
    return getQueryID();
  }

  getFuzzy(namespace) {
    return getFuzzy(namespace);
  }
}

function setSearchResults(namespace, results) {
  setResults(namespace, list(results.searchResponse.results));
  updateResponse(namespace, results.searchResponse);
}

const resultStore = new ResultStore();

resultStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === 'SERVER_ACTION') {
    switch (action.actionType) {
      case SearchConstants.SEARCH: {
        if (!action.actionData) {
          // Request was cancelled
          break;
        }

        const req = RequestStore.getRequest(action.namespace);
        if (!equal(action.searchQuery, req)) {
          // Results came back that didn't match the current query state, so we disregard them.
          // This is caused by results coming back out of order, usually due to networking issues.
          break;
        }

        setSearchResults(action.namespace, action.actionData);

        resultStore.emitChange();
        break;
      }
      default:
        break;
    }
  }
});

export default resultStore;
