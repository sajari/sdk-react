import Components from '../constants/QueryComponentConstants.js';

const {
  AGGREGATE, BODY, CLICK_TOKENS, FIELDS, FILTER, INDEX_BOOST, LIMIT, META_BOOST, OFFSET, POS_NEG_TOKENS, SORT, TRANSFORM, FEATURE_BOOST,
} = Components;

// The builders take data for a particular query component
// and return reducer functions that apply the data to the request
const builders = {
  [BODY]: body => (
    r => r.update('body', b => b.push(body))
  ),
  [OFFSET]: offset => (
    r => r.set('offset', offset)
  ),
  [LIMIT]: limit => (
    r => r.set('limit', limit)
  ),
  [FILTER]: filter => (
    r => r.update('filters', filters => filters.push(filter))
  ),
  [FIELDS]: fields => (
    r => r.update('fields', fieldList => fieldList.push(...fields))
  ),
  [SORT]: sorts => (
    r => r.set('sorts', sorts)
  ),
  [META_BOOST]: metaBoost => (
    r => r.update('meta_boosts', metaBoosts => metaBoosts.push(metaBoost))
  ),
  [INDEX_BOOST]: indexBoost => (
    r => r.update('index_boosts', indexBoosts => indexBoosts.push(indexBoost))
  ),
  [FEATURE_BOOST]: featureBoost => (
    r => r.update('feature_boosts', featureBoosts => featureBoost.push(featureBoost))
  ),
  [TRANSFORM]: transform => (
    r => r.update('transforms', transforms => transforms.push(transform))
  ),
  [AGGREGATE]: aggregate => (
    r => r.update('aggregates', aggregates => aggregates.push(aggregate))
  ),
  [CLICK_TOKENS]: field => (
    r => r.set('token_key_field', field).set('token_type', 'CLICK')
  ),
  [POS_NEG_TOKENS]: field => (
    r => r.set('token_key_field', field).set('token_type', 'POS_NEG')
  ),
};

export default builders;
