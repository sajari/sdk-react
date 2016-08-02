import {Map} from "immutable";
import {Api} from "sajari";

import {ChangeEmitter} from "../utils/ChangeEmitter.js";
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import NamespaceStore from "./NamespaceStore.js";

let _data = Map();

class ApiStore extends ChangeEmitter {
  get(namespace) {
    return _data.get(namespace ? namespace : "default").api;
  }
}

let _apiStore = new ApiStore();

function newApi(project, collection) {
  return {
    api: new Api(project, collection),
    project: project,
    collection: collection,
  };
}

function updateStoreState() {
  const namespaces = NamespaceStore.getAll();
  namespaces.map(({project, collection}, namespace) => {
    let ns = _data.get(namespace);
    // Check if namespace isn't in the API store or it's project or collection have changed
    // If so, remake the API object from the new values
    if (!ns || project !== ns.project || collection != ns.collection) {
      _data = _data.set(namespace, newApi(project, collection));
    }
  });
}

NamespaceStore.addChangeListener(updateStoreState);

export default _apiStore;
