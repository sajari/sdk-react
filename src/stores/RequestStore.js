import Immutable from "immutable";

import {ChangeEmitter} from "../utils/ChangeEmitter.js";
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import SearchConstants from "../constants/SearchConstants.js";
import Proto from "../proto/query.js";

const Request = Proto.sajari.engine.query.Request;

let _data = Immutable.Map({
  "default": Immutable.List(),
});

function requestBase() {
  return {
    body: [],
    terms: [],
    filter: [],
    meta_boosts: [],
    index_boosts: [],
    page: 1,
    max_results: 20,
    fields: [],
    sort: [],
    aggregates: {},
    transforms: [],
  };
}

function buildRequest(namespace) {
  return _data.get(namespace).reduce((r, t) => {
    return t.modifier(r);
  }, requestBase());
}

class RequestStore extends ChangeEmitter {
  getRequest(namespace) {
    return buildRequest(namespace ? namespace : "default");
  }
}

let _requestStore = new RequestStore();

_requestStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === "SEARCH_ACTION") {
    if (action.actionType === SearchConstants.SET_REQUEST_MODIFIER) {
      _data = _data.updateIn([action.namespace], modifierList => {
        const pos = modifierList.findIndex(i => {return i.uuid === action.uuid; });

        return pos >= 0 ? modifierList.update(pos, () => {return {
          uuid: action.uuid,
          modifier: action.modifier,
        }; }) : modifierList.push({
          uuid: action.uuid,
          modifier: action.modifier,
        });
      });
      _requestStore.emitChange();
    } else if (action.actionType === SearchConstants.REMOVE_REQUEST_MODIFIER) {
      _data = _data.updateIn([action.namespace], modifierList => {
        return modifierList.filter(i => {
          return i.uuid !== action.uuid;
        });
      });
      _requestStore.emitChange();
    }
  }
});

export default _requestStore;
