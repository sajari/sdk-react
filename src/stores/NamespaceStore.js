import Immutable from "immutable";

import {ChangeEmitter} from "../utils/ChangeEmitter.js";
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import NamespaceConstants from "../constants/NamespaceConstants.js";

let _data = Immutable.Map();

function k(p, c, e) {
  return {project: p, collection: c, engine: e};
}

function get(namespace) {
  return _data.get(namespace);
}

class NamespaceStore extends ChangeEmitter {
  get(namespace) {
    return get(namespace);
  }
}

function set(project, collection, namespace, engine) {
  _data = _data.set(namespace, k(project, collection, engine));
}

function remove(namespace) {
  _data = _data.delete(namespace);
}

let _namespaceStore = new NamespaceStore();

_namespaceStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === "NAMESPACE_ACTION") {
    if (action.actionType === NamespaceConstants.SET) {
      set(action.project, action.collection, action.namespace, action.engine);
      _namespaceStore.emitChange();
    } else if (action.actionType === NamespaceConstants.REMOVE) {
      remove(action.namespace);
      _namespaceStore.emitChange();
    }
  }
});

export default _namespaceStore;
