import { Query, COMB_FILTER_OP_ALL, combinatorFilter } from 'sajari';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';
import RequestStore from '../stores/RequestStore.js';
import NamespaceStore from '../stores/NamespaceStore.js';
import '../stores/QueryStore.js';
import ApiStore from '../stores/ApiStore.js';

import Builders from '../utils/RequestBuilder.js';

function dispatchSetModifier(namespace, uuid, modifier) {
  AppDispatcher.handleRequestAction({
    actionType: SearchConstants.SET_REQUEST_MODIFIER,
    namespace,
    uuid,
    modifier,
  });
}

function dispatchRemoveModifier(namespace, uuid, componentName) {
  AppDispatcher.handleRequestAction({
    actionType: SearchConstants.REMOVE_REQUEST_MODIFIER,
    namespace,
    uuid,
    componentName,
  });
}

function buildRequest(namespace) {
  const ns = NamespaceStore.get(namespace);
  if (!ns) {
    return null;
  }

  const ir = RequestStore.getRequest(namespace);
  const request = new Query();

  request.page(ir.page);
  request.resultsPerPage(ir.max_results);
  request.body(ir.body);
  request.fieldBoosts(ir.meta_boosts);
  request.instanceBoosts(ir.index_boosts);
  request.aggregates(ir.aggregates);
  if (ir.filters.length === 1) {
    request.filter(ir.filters[0]);
  } else if (ir.filters.length > 1) {
    request.filter(combinatorFilter(ir.filters, COMB_FILTER_OP_ALL));
  }
  request.fields(ir.fields);
  request.sort(ir.sorts);

  return request;
}

const SearchActions = {

  nsearch(namespace) {
    const namespaces = typeof namespace === 'string' ? [namespace] : namespace;

    namespaces.forEach(n => {
      const req = RequestStore.getRequest(n);
      const builtReq = buildRequest(n);
      if (!builtReq) {
        return;
      }

      // Send the search request
      const inFlightRequest = ApiStore.get(n).search(builtReq, (err, res) => {
        if (err) {
          AppDispatcher.handleServerAction({
            actionType: SearchConstants.SEARCH_ERROR,
            actionData: err,
            searchQuery: req,
            namespace: n,
          });
          return;
        }
        AppDispatcher.handleServerAction({
          actionType: SearchConstants.SEARCH,
          actionData: res,
          searchQuery: req,
          namespace: n,
        });
      });

      // Dispatch an action with the in-progress request
      AppDispatcher.handleRequestAction({
        actionType: SearchConstants.SEARCH_INFLIGHT,
        actionData: inFlightRequest,
        namespace: n,
      });
    });
  },

  update(namespace, uuid, componentName, data) {
    if (!data) {
      return;
    }

    const namespaces = typeof namespace === 'string' ? [namespace] : namespace;

    namespaces.forEach(n => {
      dispatchSetModifier(n, uuid, Builders[componentName](data));
    });
  },

  remove(namespace, uuid, componentName) {
    dispatchRemoveModifier(namespace, uuid, componentName);
  },
};

export default SearchActions;
