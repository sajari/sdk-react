import { Map as map } from 'immutable';

import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';

let data = map();

function get(namespace) {
  return data.get(namespace);
}

class QueryStore extends ChangeEmitter {
  get(namespace) {
    return get(namespace);
  }
}

function set(namespace, query) {
  data = data.set(namespace, query);
}

const queryStore = new QueryStore();

queryStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === 'SEARCH_ACTION') {
    if (action.actionType === SearchConstants.SEARCH_INFLIGHT) {
      const existingRequest = get(action.namespace);
      if (existingRequest && existingRequest.abort) {
        existingRequest.abort();
      }
      set(action.namespace, action.actionData);
      queryStore.emitChange();
    }
  }
});

export default queryStore;
