import { Map as map } from 'immutable';

import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import NamespaceConstants from '../constants/NamespaceConstants.js';

let data = map();

function k(project, collection, engine) {
  return { project, collection, engine };
}

function get(namespace) {
  return data.get(namespace);
}

function getAll() {
  return data;
}

class NamespaceStore extends ChangeEmitter {
  get(namespace) {
    return get(namespace);
  }

  getAll() {
    return getAll();
  }
}

function set(project, collection, namespace, engine) {
  data = data.set(namespace, k(project, collection, engine));
}

function remove(namespace) {
  data = data.delete(namespace);
}

const namespaceStore = new NamespaceStore();

namespaceStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === 'NAMESPACE_ACTION') {
    if (action.actionType === NamespaceConstants.SET) {
      set(action.project, action.collection, action.namespace, action.engine);
      namespaceStore.emitChange();
    } else if (action.actionType === NamespaceConstants.REMOVE) {
      remove(action.namespace);
      namespaceStore.emitChange();
    }
  }
});

export default namespaceStore;
