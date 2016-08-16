import { Map as map } from 'immutable';

import { Query, COMB_FILTER_OP_ALL, combinatorFilter } from 'sajari';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';
import Components from '../constants/QueryComponentConstants.js';
import RequestStore from '../stores/RequestStore.js';
import NamespaceStore from '../stores/NamespaceStore.js';
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
  request.maxResults(ir.max_results);
  request.body(ir.body);
  request.metaBoosts(ir.meta_boosts);
  request.indexBoosts(ir.index_boosts);
  request.aggregates(ir.aggregates);
  request.filter(combinatorFilter(ir.filters, COMB_FILTER_OP_ALL));
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
      const inFlightRequest = ApiStore.get(n).search(builtReq, res => {
        AppDispatcher.handleServerAction({
          actionType: SearchConstants.SEARCH,
          actionData: res,
          searchQuery: req,
          namespace: n,
        });
      }, (/* err */) => {
        // TODO(tbillington): Add error to results to that injector can pass it along
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
      dispatchSetModifier(namespace, uuid, Builders[componentName](data));
    })
  },

  remove(namespace, uuid, componentName) {
    dispatchRemoveModifier(namespace, uuid, componentName);
  },
};

export default SearchActions;
