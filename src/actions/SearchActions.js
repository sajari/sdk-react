import Superagent from 'superagent';
import Immutable from 'immutable';

import { Query, Body, fieldBoost, countAggregate, fieldEqTo, all } from 'sajari-sdk-js';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SearchConstants from '../constants/SearchConstants.js';
import Components from '../constants/Components.js';
import RequestStore from '../stores/RequestStore.js';
import NamespaceStore from '../stores/NamespaceStore.js';
import Proto from '../proto/query.js';

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

const _builders = {};
_builders[Components.BODY] = body => (
  r => {
    r.body.push(body);
    return r;
  }
);
_builders[Components.PAGE] = page => (
  r => {
    r.page = page;
    return r;
  }
);
_builders[Components.MAXRESULTS] = maxResults => (
  r => {
    r.max_results = maxResults;
    return r;
  }
);
_builders[Components.FILTER] = f => (
  r => {
    r.filter.push(f);
    return r;
  }
);
_builders[Components.FIELDS] = fields => (
  r => {
    r.fields = fields;
    return r;
  }
);
_builders[Components.SORT] = s => (
  r => {
    r.sort.push(s);
    return r;
  }
);
_builders[Components.META_BOOST] = mb => (
  r => {
    r.meta_boosts.push(mb);
    return r;
  }
);
_builders[Components.INDEX_BOOST] = ib => (
  r => {
    r.index_boosts.push(ib);
    return r;
  }
);
_builders[Components.TRANSFORMS] = ts => (
  r => {
    r.transforms = r.transforms.concat(ts.map(t => {
      return {identifier: t};
    }));
    return r;
  }
);
_builders[Components.AGGREGATE] = ag => (
  r => {
    r.aggregates[ag.name] = ag.data;
    return r;
  }
);
const SearchActions = {

  nsearch(namespace) {
    const ns = NamespaceStore.get(namespace);
    if (!ns) {
      return;
    }
    // const api = new Sajari(ns.project, ns.collection, { jsonp: true});
    const req = RequestStore.getRequest(namespace);
    if (!req.body || !req.body[0] || !req.body[0].text) {
      req.body = [{ text: '', weight: 1 }];
      // return;
    }
    // const q = api.query(req.body[0].text);
    // if (!qid && !qse) {
    //   qid = q.id;
    //   qse = q.se;
    // } else {
    //   q.id = qid;
    //   qse += 1;
    //   q.se = qse;
    // }
    // if (req.max_results) {
    //   q.maxresults(req.max_results);
    // }
    // if (req.page) {
    //   q.page(req.page);
    // }
    // if (req.filter) {
    //   // The map is a temporary impl to support v9 api
    //   req.filter.map(f => {
    //     return q.filter(f.field.field, f.op, f.field.value);
    //   })
    // }
    // q.facetfields(['dir1', 'category'], 1000);
    //
    // if (ns.engine === 'v9') {
    //   api.search(q, function(results) {
    //     AppDispatcher.handleServerAction({
    //       actionType: SearchConstants.SEARCH,
    //       actionData: results,
    //       searchQuery: req.body[0].text,
    //       namespace: namespace,
    //     });
    //   },
    //   function(errors) {
    //     console.log('error with search:');
    //     console.log(errors);
    //   });
    //   return
    // }

    // v10

    let v10q = new Query().page(req.page).maxResults(req.max_results).body(
      req.body.map(b => new Body(b.text, b.weight))
    );
    if (req.index_boosts) {
      v10q = v10q.indexBoosts(
        req.index_boosts.map(b => fieldBoost(b.field.field, b.field.value))
      );
    }
    if (req.aggregates) {
      const a = Immutable.Map(req.aggregates).entrySeq().map(([name, data]) => {
        return countAggregate(name, data.count.field);
      }).toArray();
      v10q = v10q.aggregates(
        a
      );
    }
    if (req.filter.length > 0) {
      v10q = v10q.filter(
        // fieldEqTo(req.filter[0].field.field, req.filter[0].field.value)
        all(req.filter.map(f => (
          fieldEqTo(f.field.field, f.field.value)
        )))
      );
    }

    Superagent
      .post('http://104.197.81.15:9200/search/')
      .send(JSON.stringify({
        request: v10q.proto(),
        project: ns.project,
        collection: ns.collection,
      }))
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          AppDispatcher.handleServerAction({
            actionType: SearchConstants.SEARCH,
            actionData: JSON.parse(res.text),
            searchQuery: req.body[0].text,
            namespace,
          });
        }
      });

    // const r = new Request(req);
    // console.log(r);

    // const data = {
    //   request: r.encode64(),
    //   // pr: r.encode64(),
    //   project: ns.project,
    //   collection: ns.collection,
    // };

    // console.log(data);
    // console.log(JSON.stringify(req, null, '\t'));
    // console.log(JSON.stringify(JSON.parse(r.encodeJSON()), null, '\t'));

    // Superagent.post(
    //   'http://localhost:8080/api/searchproto'
    // ).send(
    //   JSON.stringify(data)
    // ).set(
    //   'Accept', 'application/json'
    // ).set('Accept', 'application/json').end(function(err, res){
    //   // Error handling is broken .....
    //   if (err) {
    //     console.log('Search error', err);
    //   //   return;
    //   }
    //   console.log(err, res, res.text);
    //   const t = res.text;
    //   AppDispatcher.handleServerAction({
    //     actionType: SearchConstants.SEARCH,
    //     actionData: t,
    //   });
    // });
  },

  update(namespace, uuid, componentName, data) {
    if (!data) {
      return;
    }
    dispatchSetModifier(namespace, uuid, _builders[componentName](data));
  },

  remove(namespace, uuid, componentName) {
    dispatchRemoveModifier(namespace, uuid, componentName);
  },
};

export default SearchActions;
