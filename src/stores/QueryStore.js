import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';

let data = {}

class QueryStore extends ChangeEmitter {
  get(namespace) {
    return data[namespace];
  }
}

const queryStore = new QueryStore();

queryStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === 'SEARCH_ACTION') {
    if (action.actionType === SearchConstants.SEARCH_INFLIGHT) {
      const existingRequest = data[action.namespace]
      if (existingRequest && existingRequest.abort) {
        existingRequest.abort();
      }
      data = {
        ...data,
        [action.namespace]: action.data,
      }
      queryStore.emitChange();
    }
  }
});

export default queryStore;
