import { fromJS, List as list } from 'immutable';

import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher';
import SearchConstants from '../constants/SearchConstants.js';
import RequestStore from './RequestStore.js';
import SearchActions from '../actions/SearchActions.js';
import equal from 'deep-equal';

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

function setResults(r) {
  data = data.setIn([nameDefault, 'results'], r);
}

function getResults() {
  return data.getIn([nameDefault, 'results']);
}

function setAggregates(a) {
  data = data.setIn([nameDefault, 'aggregates'], a);
}

function getAggregates() {
  return data.getIn([nameDefault, 'aggregates']);
}

function setReads(r) {
  data = data.setIn([nameDefault, 'response', 'reads'], r);
}

function getReads() {
  return data.getIn([nameDefault, 'response', 'reads']);
}

function setTotalMatches(t) {
  data = data.setIn([nameDefault, 'response', 'totalMatches'], t);
}

function getTotalMatches() {
  return data.getIn([nameDefault, 'response', 'totalMatches']);
}

function setMsecs(m) {
  data = data.setIn([nameDefault, 'response', 'msecs'], m);
}

function getMsecs() {
  return data.getIn([nameDefault, 'response', 'msecs']);
}

function setStatusCode(c) {
  data = data.setIn([nameDefault, 'response', 'statusCode'], c);
}

function getStatusCode() {
  return data.getIn([nameDefault, 'response', 'statusCode']);
}

function setQueryID(qid) {
  data = data.setIn([nameDefault, 'response', 'queryID'], qid);
}

function getQueryID() {
  return data.getIn([nameDefault, 'response', 'queryID']);
}

function setFuzzy(f) {
  f = f ? f : '';
  data = data.setIn([nameDefault, 'fuzzy'], f);
}

function getFuzzy() {
  return data.getIn([nameDefault, 'fuzzy']);
}

function setFacets(f) {
  f = f || {};
  data = data.setIn([nameDefault, 'facets'], fromJS(f));
}

function getFacets() {
  return data.getIn([nameDefault, 'facets']);
}

function updateResponse(result) {
  // v10
  setTotalMatches(Number(result.totalResults));
  setAggregates(result.aggregates);
  return;

  // v9
  /*
  if (protectFacets) {
    protectFacets = false;
  } else {
    setFacets(result.response.facets);
  }
  setReads(result.response.reads);
  setTotalMatches(result.response.totalmatches);
  setMsecs(result.msecs);
  setStatusCode(result.statusCode);
  setQueryID(result.response.queryID);
  setFuzzy(result.response.fuzzy);
  */
}

function getResponse() {
  return data.getIn([nameDefault, 'response']);
}

function setPage(p) {
  data = data.setIn([nameDefault, 'page'], p);
}

function getPage() {
  return data.getIn([nameDefault, 'page']);
}

// Store for holding search results
class ResultStore extends ChangeEmitter {

  getResults() {
    return getResults();
  }

  getAggregates() {
    return getAggregates();
  }

  getResponse() {
    return getResponse();
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

  getPage() {
    return getPage();
  }

  getFacets() {
    return getFacets();
  }

  getFuzzy() {
    return getFuzzy();
  }

  clearResults() {
    setResults(list());
    setTotalMatches(0);
    this.emitChange();
  }
}

function setSearchResults(results) {
  setResults(list(results.response.results));
  updateResponse(results.response);
  setPage(1);
}

function appendSearchResults(results) {
  setResults(getResults().concat(results.results));
  updateResponse(results);
  setPage(getPage() + 1);
}

const resultStore = new ResultStore();

resultStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === 'SERVER_ACTION') {
    switch (action.actionType) {
      case SearchConstants.SEARCH: {
        const req = RequestStore.getRequest(action.namespace);
        if (!equal(action.searchQuery, req)) {
          // Results came back that didn't match the current search query, so we disregard them.
          // TODO(tbillington): Do this better, it's not a long term solution.
          break;
        }

        setSearchResults(action.actionData);

        resultStore.emitChange();
        break;
      }
      default:
        break;
    }
  } else if (source === 'VIEW_ACTION') {
    switch (action.actionType) {
      case SearchConstants.ADD_FILTER:
      case SearchConstants.REMOVE_FILTER:
      case SearchConstants.SET_PAGE: {
        protectFacets = true;
        setTimeout(() => {
          SearchActions.newSearch();
        }, 10);
        break;
      }
      default:
        break;
    }
  }
});

export default resultStore;
