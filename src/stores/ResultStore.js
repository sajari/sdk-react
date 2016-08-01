"use strict";

import Immutable from "immutable";

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

function setResults(r) {
  _data = _data.setIn([nameDefault, "results"], r);
}

function getResults() {
  return _data.getIn([nameDefault, "results"]);
}

function setAggregates(a) {
  _data = _data.setIn([nameDefault, "aggregates"], a);
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

function setTotalMatches(t) {
  _data = _data.setIn([nameDefault, "response", "totalMatches"], t);
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

function updateResponse(result) {
  // v10
  setTotalMatches(Number(result.totalResults));
  setAggregates(result.aggregates);
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

function getResponse() {
  return _data.getIn([nameDefault, "response"]);
}

function setPage(p) {
  _data = _data.setIn([nameDefault, "page"], p);
}

function getPage() {
  return _data.getIn([nameDefault, "page"]);
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
    setResults(Immutable.List());
    setTotalMatches(0);
    this.emitChange();
  }
}

function setSearchResults(results) {
  setResults(Immutable.List(results.results));
  updateResponse(results);
  setPage(1);
}

function appendSearchResults(results) {
  setResults(getResults().concat(results.results));
  updateResponse(results);
  setPage(getPage() + 1);
}

var _resultStore = new ResultStore();

_resultStore.dispatchToken = AppDispatcher.register(payload => {
  var action = payload.action;
  var source = payload.source;

  if (source === "SERVER_ACTION") {
    switch (action.actionType) {
      case SearchConstants.SEARCH:
        const req = RequestStore.getRequest(action.namespace);
        const body = req.body ? req.body[0] ? req.body[0].text ? req.body[0].text : "" : "" : "";
        if (action.searchQuery !== body) {
          // Results came back that didn't match the current search query, so we disregard them.
          // TODO(tbillington): Do this better, it's not a long term solution.
          break;
        }

        setSearchResults(action.actionData);

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
