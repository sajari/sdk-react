import { Query } from 'sajari';

import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';

let data = {}

class QueryDataStore extends ChangeEmitter {
  get(namespace = 'default') {
    return data[namespace]
  }
}

const queryDataStore = new QueryDataStore();

function AddTrackingResetListener(fn) {
  queryDataStore.addChangeListener(fn);
}

function RemoveTrackingResetListener(fn) {
  queryDataStore.removeChangeListener(fn);
}

queryDataStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action
  const source = payload.source

  if (source === 'SEARCH_ACTION') {
    if (action.actionType === SearchConstants.QUERY_DATA) {
      data = {
        ...data,
        [action.namespace]: action.data,
      }
    } else if (action.actionType === SearchConstants.TRACKING_RESET) {
      const q = data[action.namespace]
      if (q) {
        q.resetID()
        data = {
          ...data,
          [action.namespace]: q,
        }
      }
    }
  }
})

export { queryDataStore, AddTrackingResetListener, RemoveTrackingResetListener }
