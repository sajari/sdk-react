import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import NamespaceConstants from '../constants/NamespaceConstants.js';

let data = {}

class NamespaceStore extends ChangeEmitter {
  get(namespace = 'default') {
    return data[namespace]
  }

  getAll() {
    return data
  }
}

const namespaceStore = new NamespaceStore();

namespaceStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === 'NAMESPACE_ACTION') {
    if (action.actionType === NamespaceConstants.SET) {
      data = {
        ...data,
        [action.namespace]: {
          project: action.project,
          collection: action.collection,
        }
      }
      namespaceStore.emitChange();
    } else if (action.actionType === NamespaceConstants.REMOVE) {
      let { [action.namespace]: _, ...rest } = data
      data = rest
      namespaceStore.emitChange();
    }
  }
});

export default namespaceStore;
