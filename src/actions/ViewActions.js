import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';
import SearchActions from './SearchActions.js';

class ViewActions {
  // Run when the input is emptied, clears the results, resets query id
  foxtelBlank() {
    SearchActions.invalidateQcache();
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.FOXTEL_BLANK,
    });
  }

  setQueryBody(qb) {
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.SET_QUERY_BODY,
      actionData: qb,
    });
  }

  setSort(s) {
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.SET_SORT,
      actionData: s,
    });
  }

  setPage(p) {
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.SET_PAGE,
      actionData: p,
    });
  }

  addFilter(realName, field) {
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.ADD_FILTER,
      realName,
      field,
    });
  }

  removeFilter(filter) {
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.REMOVE_FILTER,
      actionData: filter,
    });
  }
}

export default new ViewActions();
