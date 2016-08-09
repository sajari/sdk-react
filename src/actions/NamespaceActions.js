import AppDispatcher from '../dispatcher/AppDispatcher.js';

import NamespaceConstants from '../constants/NamespaceConstants.js';

class NamespaceActions {
  set(project, collection, namespace, engine) {
    AppDispatcher.handleNamespaceAction({
      actionType: NamespaceConstants.SET,
      project,
      collection,
      namespace,
      engine,
    });
  }

  remove(namespace) {
    AppDispatcher.handleNamespaceAction({
      actionType: NamespaceConstants.REMOVE,
      namespace,
    });
  }
}

const namespaceActions = new NamespaceActions();

export default namespaceActions;
