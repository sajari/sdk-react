import AppDispatcher from "../dispatcher/AppDispatcher.js";

import NamespaceConstants from "../constants/NamespaceConstants.js";

class NamespaceActions {
  set(project, collection, namespace, engine) {
    AppDispatcher.handleNamespaceAction({
      actionType: NamespaceConstants.SET,
      project: project,
      collection: collection,
      namespace: namespace,
      engine: engine,
    });
  }

  remove(namespace) {
    AppDispatcher.handleNamespaceAction({
      actionType: NamespaceConstants.REMOVE,
      namespace: namespace,
    });
  }
}

const _namespaceActions = new NamespaceActions();

export default _namespaceActions;
