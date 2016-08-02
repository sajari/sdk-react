import Immutable from "immutable";
import log from "loglevel";

import {Api, Query, Body, FieldBoost, Count, FieldEqTo, All} from "sajari";

import AppDispatcher from "../dispatcher/AppDispatcher.js";
import SearchConstants from "../constants/SearchConstants.js";
import ConfigStore from "../stores/ConfigStore.js";
import Components from "../constants/Components.js";
import RequestStore from "../stores/RequestStore.js";
import NamespaceStore from "../stores/NamespaceStore.js";
import Proto from "../proto/query.js";

const Request = Proto.sajari.engine.query.Request;

function dispatchSetModifier(namespace, uuid, modifier) {
  AppDispatcher.handleRequestAction({
    actionType: SearchConstants.SET_REQUEST_MODIFIER,
    namespace: namespace,
    uuid: uuid,
    modifier: modifier,
  });
}

function dispatchRemoveModifier(namespace, uuid, componentName) {
  AppDispatcher.handleRequestAction({
    actionType: SearchConstants.REMOVE_REQUEST_MODIFIER,
    namespace: namespace,
    uuid: uuid,
    componentName: componentName,
  });
}

let _builders = {};
_builders[Components.BODY] = body => {
  return r => {
    r.body.push(body);
    return r;
  };
};
_builders[Components.PAGE] = page => {
  return r => {
    r.page = page;
    return r;
  };
};
_builders[Components.MAXRESULTS] = maxResults => {
  return r => {
    r.max_results = maxResults;
    return r;
  };
};
_builders[Components.FILTER] = f => {
  return r => {
    r.filter.push(f);
    return r;
  };
};
_builders[Components.FIELDS] = fields => {
  return r => {
    r.fields = fields;
    return r;
  };
};
_builders[Components.SORT] = s => {
  return r => {
    r.sort.push(s);
    return r;
  };
};
_builders[Components.META_BOOST] = mb => {
  return r => {
    r.meta_boosts.push(mb);
    return r;
  };
};
_builders[Components.INDEX_BOOST] = ib => {
  return r => {
    r.index_boosts.push(ib);
    return r;
  };
};
_builders[Components.TRANSFORMS] = ts => {
  return r => {
    r.transforms = r.transforms.concat(ts.map(t => {
      return {identifier: t};
    }));
    return r;
  };
};
_builders[Components.AGGREGATE] = ag => {
  return r => {
    r.aggregates[ag.name] = ag.data;
    return r;
  };
};

var SearchActions = {

  nsearch: function(namespace) {
    const ns = NamespaceStore.get(namespace);
    if (!ns) {
      log.error(`search failed: namespace ${namespace} not found`);
      return;
    }

    const req = RequestStore.getRequest(namespace);

    let query = new Query();
    query.page(req.page);
    query.maxResults(req.max_results);
    query.body(
      req.body.map(b => new Body(b.text, b.weight))
    );
    if (req.index_boosts) {
      query.indexBoosts(
        req.index_boosts.map(b => FieldBoost(b.field.field, b.field.value))
      );
    }
    if (req.aggregates) {
      const a = Immutable.Map(req.aggregates).entrySeq().map(([name, data]) => {
        return Count(name, data.count.field);
      }).toArray();
      query.aggregates(a);
    }
    if (req.filter.length > 0) {
      query.filter(
        all(req.filter.map(f => {
          return FieldEqTo(f.field.field, f.field.value);
        }))
      )
    }
    if (req.fields) {
      query.fields(req.fields);
    }

    const api = new Api(ns.project, ns.collection);
    api.search(query, res => {
      AppDispatcher.handleServerAction({
        actionType: SearchConstants.SEARCH,
        actionData: res,
        searchQuery: req.body[0].text,
        namespace: namespace,
      });
    }, err => {
      console.log(err);
    })
  },

  update: function(namespace, uuid, componentName, data) {
    if (!data) {
      return;
    }
    dispatchSetModifier(namespace, uuid, _builders[componentName](data));
  },

  remove: function(namespace, uuid, componentName) {
    dispatchRemoveModifier(namespace, uuid, componentName);
  },
};

export default SearchActions;
