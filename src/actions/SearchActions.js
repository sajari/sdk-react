import { Map as map } from 'immutable';

import {
  Query, body, fieldIndexBoost, countAggregate, FILTER_OP_GT_EQ, COMB_FILTER_OP_ALL,
  filterMetaBoost, combinatorFilter, fieldFilter,
} from 'sajari';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';
import Components from '../constants/Components.js';
import RequestStore from '../stores/RequestStore.js';
import NamespaceStore from '../stores/NamespaceStore.js';
import ApiStore from '../stores/ApiStore.js';

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

const builders = {};
builders[Components.BODY] = body => (
  r => {
    r.body.push(body);
    return r;
  }
);
builders[Components.PAGE] = page => (
  r => {
    r.page = page;
    return r;
  }
);
builders[Components.MAXRESULTS] = maxResults => (
  r => {
    r.max_results = maxResults;
    return r;
  }
);
builders[Components.FILTER] = f => (
  r => {
    r.filter.push(f);
    return r;
  }
);
builders[Components.FIELDS] = fields => (
  r => {
    r.fields = fields;
    return r;
  }
);
builders[Components.SORT] = s => (
  r => {
    r.sort.push(s);
    return r;
  }
);
builders[Components.META_BOOST] = mb => (
  r => {
    r.meta_boosts.push(mb);
    return r;
  }
);
builders[Components.INDEX_BOOST] = ib => (
  r => {
    r.index_boosts.push(ib);
    return r;
  }
);
builders[Components.TRANSFORM] = ts => (
  r => {
    r.transforms.push(ts);
    return r;
  }
);
builders[Components.AGGREGATE] = ag => (
  r => {
    r.aggregates[ag.name] = ag.data;
    return r;
  }
);

function buildRequest(namespace) {
  const ns = NamespaceStore.get(namespace);
  if (!ns) {
    return null;
  }

  const req = RequestStore.getRequest(namespace);

  const v10q = new Query();
  v10q.page(req.page);
  v10q.maxResults(req.max_results);
  v10q.body(
    req.body.map(b => body(b.text, b.weight))
  );
  if (req.meta_boosts) {
    v10q.metaBoosts(
      req.meta_boosts
    );
  }
  if (req.index_boosts) {
    v10q.indexBoosts(
      req.index_boosts.map(b => fieldIndexBoost(b.field.field, b.field.value))
    );
  }
  if (req.aggregates) {
    const a = map(req.aggregates).entrySeq().map(([name, data]) => (
      countAggregate(name, data.count.field)
    )).toArray();
    v10q.aggregates(
      a
    );
  }
  if (req.filter.length > 0) {
    v10q.filter(
      combinatorFilter(
        req.filter,
        COMB_FILTER_OP_ALL
      )
    );
  }
  if (req.fields && req.fields.length > 0) {
    v10q.fields(req.fields);
  }

  // Sort

  return v10q;
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
    if (typeof namespace === 'string') {
      dispatchSetModifier(namespace, uuid, builders[componentName](data));
    } else {
      namespace.forEach(n => {
        dispatchSetModifier(n, uuid, builders[componentName](data));
      });
    }
  },

  remove(namespace, uuid, componentName) {
    dispatchRemoveModifier(namespace, uuid, componentName);
  },
};

export default SearchActions;
