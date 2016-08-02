"use strict";

import Immutable from "immutable";
import deepEqual from "deep-equal";

import {ChangeEmitter} from "../utils/ChangeEmitter.js";
import AppDispatcher from "../dispatcher/AppDispatcher";
import SearchConstants from "../constants/SearchConstants.js";
import ConfigStore from "./ConfigStore.js";
import RequestStore from "./RequestStore.js";
import SearchActions from "../actions/SearchActions.js";
const nameDefault = "default";

let protectFacets = false; // switch to keep facets from original search around for rendering

let _data = Immutable.fromJS({
  default: {
    results: [],
    page: 1,
    response: {
      reads: 0,
      totalMatches: 0,
      msecs: 0,
      statusCode: 0,
      queryID: "",
    },
    facets: {},
    fuzzy: "",
    aggregates: {},
  },
});

function setResults(namespace, results) {
  _data = _data.setIn([namespace, "results"], results);
}

function getResults(namespace) {
  return _data.getIn([namespace, "results"], Immutable.List());
}

function setAggregates(namespace, aggregates) {
  _data = _data.setIn([namespace, "aggregates"], aggregates);
}

function getAggregates() {
  return _data.getIn([nameDefault, "aggregates"]);
}

function setReads(r) {
  _data = _data.setIn([nameDefault, "response", "reads"], r);
}

function getReads() {
  return _data.getIn([nameDefault, "response", "reads"]);
}

function setTotalMatches(namespace, t) {
  _data = _data.setIn([namespace, "response", "totalMatches"], t);
}

function getTotalMatches() {
  return _data.getIn([nameDefault, "response", "totalMatches"]);
}

function setMsecs(m) {
  _data = _data.setIn([nameDefault, "response", "msecs"], m);
}

function getMsecs() {
  return _data.getIn([nameDefault, "response", "msecs"]);
}

function setStatusCode(c) {
  _data = _data.setIn([nameDefault, "response", "statusCode"], c);
}

function getStatusCode() {
  return _data.getIn([nameDefault, "response", "statusCode"]);
}

function setQueryID(qid) {
  _data = _data.setIn([nameDefault, "response", "queryID"], qid);
}

function getQueryID() {
  return _data.getIn([nameDefault, "response", "queryID"]);
}

function setFuzzy(f) {
  f = f ? f : "";
  _data = _data.setIn([nameDefault, "fuzzy"], f);
}

function getFuzzy() {
  return _data.getIn([nameDefault, "fuzzy"]);
}

function setFacets(f) {
  f = f ? f : {};
  _data = _data.setIn([nameDefault, "facets"], Immutable.fromJS(f));
}

function getFacets() {
  return _data.getIn([nameDefault, "facets"]);
}

function updateResponse(namespace, result) {
  // v10
  setTotalMatches(namespace, Number(result.totalResults));
  setAggregates(namespace, result.aggregates);
  return;

  // v9
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
}

function getResponse(namespace) {
  return _data.getIn([namespace, "response"], Immutable.Map());
}

function setPage(p) {
  _data = _data.setIn([nameDefault, "page"], p);
}

function getPage() {
  return _data.getIn([nameDefault, "page"]);
}

// Store for holding search results
class ResultStore extends ChangeEmitter {

  getResults(namespace) {
    return getResults(namespace ? namespace : nameDefault);
  }

  getAggregates() {
    return getAggregates();
  }

  getResponse(namespace) {
    return getResponse(namespace ? namespace : nameDefault);
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
    setResults(Immutable.List());
    setTotalMatches(0);
    this.emitChange();
  }
}

function setSearchResults(namespace, results) {
  setResults(namespace, Immutable.List(results.results));
  updateResponse(namespace, results);
  setPage(1);
}

var _resultStore = new ResultStore();

_resultStore.dispatchToken = AppDispatcher.register(payload => {
  var action = payload.action;
  var source = payload.source;

  if (source === "SERVER_ACTION") {
    switch (action.actionType) {
      case SearchConstants.SEARCH:
        const req = RequestStore.getRequest(action.namespace);
        if (!deepEqual(action.searchQuery, req)) {
          // Results came back that didn't match the current search query, so we disregard them.
          break;
        }

        setSearchResults(action.namespace, action.actionData);

        _resultStore.emitChange();
        break;
    }
  } else if (source === "VIEW_ACTION") {
    switch (action.actionType) {
      case SearchConstants.ADD_FILTER:
      case SearchConstants.REMOVE_FILTER:
      case SearchConstants.SET_PAGE:
        protectFacets = true;
        setTimeout(() => {
          SearchActions.newSearch();
        }, 10);
        break;
    }
  }
});

export default _resultStore;
