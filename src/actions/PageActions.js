import AppDispatcher from '../dispatcher/AppDispatcher.js';
import PageConstants from '../constants/PageConstants.js';

class PageActions {
  set(namespace, page) {
    AppDispatcher.dispatch({
      source: 'PAGE_ACTION',
      action: {
        actionType: PageConstants.SET,
        page: page
      }
    });
  }

  next(namespace, page) {
    AppDispatcher.dispatch({
      source: 'PAGE_ACTION',
      action: {
        actionType: PageConstants.NEXT,
      }
    });
  }

  prev(namespace, page) {
    AppDispatcher.dispatch({
      source: 'PAGE_ACTION',
      action: {
        actionType: PageConstants.PREV,
      }
    });
  }
}

const pageActions = new PageActions();

export default pageActions;
