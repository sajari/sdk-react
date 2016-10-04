import { Map } from 'immutable';
import { Query } from 'sajari';

import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';

let data = Map();

function setQuery(namespace, query) {
  data = data.set(namespace || 'default', query)
}

function getQuery(namespace) {
  return data.get(namespace || 'default')
}

class QueryDataStore extends ChangeEmitter {
  get(namespace) {
    return getQuery(namespace);
  }
}

const queryDataStore = new QueryDataStore();

queryDataStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action
  const source = payload.source

  if (source === 'SEARCH_ACTION') {
    if (action.actionType === SearchConstants.QUERY_DATA) {
      setQuery(action.namespace, action.data)
    }
  }
})

export default queryDataStore
