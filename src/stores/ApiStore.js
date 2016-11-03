import { Map } from 'immutable';
import { Client } from 'sajari'

import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import NamespaceStore from './NamespaceStore.js';
// eslint-disable-next-line
let data = Map();

class ApiStore extends ChangeEmitter {
  get(namespace) {
    return data.get(namespace || 'default').api;
  }
}

const apiStore = new ApiStore();

function newApi(project, collection) {
  return {
    api: new Client(project, collection),
    project,
    collection,
  };
}

function updateStoreState() {
  const namespaces = NamespaceStore.getAll();
  namespaces.forEach(({ project, collection }, namespace) => {
    const ns = data.get(namespace);
    // Check if namespace isn't in the API store or it's project or collection have changed
    // If so, remake the API object from the new values
    if (!ns || project !== ns.project || collection !== ns.collection) {
      data = data.set(namespace, newApi(project, collection));
    }
  });
}

NamespaceStore.addChangeListener(updateStoreState);

export default apiStore;
