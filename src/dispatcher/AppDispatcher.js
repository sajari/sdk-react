import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action,
    });
  }

  handleServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action,
    });
  }

  handleRequestAction(action) {
    this.dispatch({
      source: 'SEARCH_ACTION',
      action,
    });
  }

  handleNamespaceAction(action) {
    this.dispatch({
      source: 'NAMESPACE_ACTION',
      action,
    });
  }

}

const dispatcher = new AppDispatcher()

// If constructor didn't get run (ie10 and friends), manually construct.
if (!dispatcher._callbacks) {
  dispatcher._callbacks = {};
  dispatcher._isDispatching = false;
  dispatcher._isHandled = {};
  dispatcher._isPending = {};
  dispatcher._lastID = 1;
}

export default dispatcher;
