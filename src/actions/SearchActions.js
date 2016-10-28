import { Query, allFilters } from 'sajari';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';
import RequestStore from '../stores/RequestStore.js';
import NamespaceStore from '../stores/NamespaceStore.js';
import { queryDataStore } from '../stores/QueryDataStore'
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
  const request = queryDataStore.get(namespace) || new Query();

  request.page(ir.page);
  request.resultsPerPage(ir.max_results);
  request.body(ir.body);
  request.fieldBoosts(ir.meta_boosts);
  request.instanceBoosts(ir.index_boosts);
  request.aggregates(ir.aggregates);
  if (ir.filters.length === 1) {
    request.filter(ir.filters[0]);
  } else if (ir.filters.length > 1) {
    request.filter(allFilters(ir.filters));
  } else {
    request.filter()
  }
  request.fields(ir.fields);
  request.sort(ir.sorts);

  // TODO(tbillington): This will not remove tracking from the query if the user has unmounted the tracking component
  if (ir.token_type === 'CLICK') {
    request.clickTracking(ir.token_key_field)
  } else if (ir.token_type === 'POS_NEG') {
    request.posNegTracking(ir.token_key_field)
  }
  request.transforms(ir.transforms)

  AppDispatcher.handleRequestAction({
    actionType: SearchConstants.QUERY_DATA,
    data: request,
    namespace,
  })

  return request;
}

const SearchActions = {

  // Export this
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

  // Private (api-component level)
  update(namespace, uuid, componentName, data) {
    if (!data) {
      return;
    }

    const namespaces = typeof namespace === 'string' ? [namespace] : namespace;

    namespaces.forEach(n => {
      dispatchSetModifier(n, uuid, Builders[componentName](data));
    });
  },

  // Private (api-comp)
  remove(namespace, uuid, componentName) {
    dispatchRemoveModifier(namespace, uuid, componentName);
  },

  // Export this ()
  resetTracking(namespace) {
    AppDispatcher.handleRequestAction({
      actionType: SearchConstants.TRACKING_RESET,
      namespace,
    })
  }
};

export default SearchActions;
