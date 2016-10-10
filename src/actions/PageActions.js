import AppDispatcher from '../dispatcher/AppDispatcher.js';
import PageConstants from '../constants/PageConstants.js';

class PageActions {
  set(namespace, page) {
    AppDispatcher.dispatch({
      source: 'PAGE_ACTION',
      action: {
        actionType: PageConstants.SET,
        namespace,
        page,
      }
    })
  }

  next(namespace) {
    AppDispatcher.dispatch({
      source: 'PAGE_ACTION',
      action: {
        actionType: PageConstants.NEXT,
        namespace,
      }
    })
  }

  prev(namespace) {
    AppDispatcher.dispatch({
      source: 'PAGE_ACTION',
      action: {
        actionType: PageConstants.PREV,
        namespace,
      }
    })
  }
}

const pageActions = new PageActions();

export default pageActions;
