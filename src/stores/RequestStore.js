import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';
import PageStore from './PageStore'

let data = {
  default: [],
}

function requestBase(namespace) {
  return map({
    body: [],
    terms: [],
    filters: [],
    meta_boosts: [],
    index_boosts: [],
    feature_boosts: [],
    offset: PageStore.get(namespace) || 0,
    limit: 10,
    fields: [],
    sorts: [],
    aggregates: [],
    transforms: [],
    token_key_field: '',
    token_type: '',
  });
}

class RequestStore extends ChangeEmitter {
  getRequest(namespace = 'default') {
    return data[namespace].reduce((r, t) => t.modifier(r), requestBase(namespace))
  }
}

const requestStore = new RequestStore();

requestStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === 'SEARCH_ACTION') {
    if (action.actionType === SearchConstants.SET_REQUEST_MODIFIER) {
      data = {
        ...data,
        [action.namespace]: (data[action.namespace] || []).filter(m => m.uuid !== action.uuid).concat({
          uuid: action.uuid,
          modified: action.modifier,
        })
      }
      requestStore.emitChange();
    } else if (action.actionType === SearchConstants.REMOVE_REQUEST_MODIFIER) {
      data = {
        ...data,
        [action.namespace]: data[action.namespace].filter(({ uuid }) => uuid !== action.uuid)
      }
      requestStore.emitChange();
    }
  }
});

export default requestStore;
