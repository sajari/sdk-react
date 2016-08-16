import Components from '../constants/Components.js';

const {
  AGGREGATE, BODY, FIELDS, FILTER, INDEX_BOOST, MAXRESULTS, META_BOOST, PAGE, SORT, TRANSFORM,
} = Components;

// The builders take data for a particular query component
// and return reducer functions that apply the data to the request
const builders = {
  [BODY]: body => (
    r => r.update('body', b => b.push(body))
  ),
  [PAGE]: page => (
    r => r.set('page', page)
  ),
  [MAXRESULTS]: maxResults => (
    r => r.set('max_results', maxResults)
  ),
  [FILTER]: filter => (
    r => r.update('filters', filters => filters.push(filter))
  ),
  [FIELDS]: fields => (
    r => r.update('fields', fieldList => fieldList.push(...fields))
  ),
  [SORT]: sort => (
    r => r.update('sorts', sorts => sorts.push(sort))
  ),
  [META_BOOST]: metaBoost => (
    r => r.update('meta_boosts', metaBoosts => metaBoosts.push(metaBoost))
  ),
  [INDEX_BOOST]: indexBoost => (
    r => r.update('index_boosts', indexBoosts => indexBoosts.push(indexBoost))
  ),
  [TRANSFORM]: transform => (
    r => r.update('transforms', transforms => transforms.push(transform))
  ),
  [AGGREGATE]: aggregate => (
    r => r.update('aggregates', aggregates => aggregates.push(aggregate))
  ),
};

export default builders;
