import AppDispatcher from "../dispatcher/AppDispatcher.js";
import SearchConstants from "../constants/SearchConstants.js";
import SearchActions from "./SearchActions.js";

class ViewActions {
  // Run when the input is emptied, clears the results, resets query id
  foxtelBlank() {
    console.log("ViewActions.foxtelBlank");
    SearchActions.invalidateQcache();
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.FOXTEL_BLANK,
    });
  }

  setQueryBody(qb) {
    console.log("ViewActions.setQueryBody", qb);
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.SET_QUERY_BODY,
      actionData: qb,
    });
  }

  setSort(s) {
    console.log("ViewActions.setSort", s);
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.SET_SORT,
      actionData: s,
    });
  }

  setPage(p) {
    console.log("ViewActions.setPage", p);
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.SET_PAGE,
      actionData: p,
    });
  }

  addFilter(realName, field) {
    console.log("ViewActions.addFilter", realName, field);
    AppDispatcher.handleViewAction({
      actionType: SearchConstants.ADD_FILTER,
      realName: realName,
      field: field,
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
