import Components from '../constants/QueryComponentConstants.js';

const {
  AGGREGATE, BODY, CLICK_TOKENS, FIELDS, FILTER, INDEX_BOOST, LIMIT, META_BOOST, OFFSET, POS_NEG_TOKENS, SORT, TRANSFORM, FEATURE_BOOST,
} = Components;

// The builders take data for a particular query component
// and return reducer functions that apply the data to the request
const builders = {
  [BODY]: body => (
    r => {
      ...r,
      body: [ ...r.body, body ],
    }
  ),
  [OFFSET]: offset => (
    r => { ...r, offset }
  ),
  [LIMIT]: limit => (
    r => { ...r, limit }
  ),
  [FILTER]: filter => (
    r => {
      ...r,
      filters: [ ...r.filters, filter ],
    }
  ),
  [FIELDS]: fields => (
    r => {
      ...r,
      fields: [ ...r.fields, fields ],
    }
  ),
  [SORT]: sorts => (
    r => { ...r, sorts }
  ),
  [META_BOOST]: metaBoost => (
    r => {
      ...r,
      meta_boosts: [ ...r.meta_boosts, metaBoost ],
    }
  ),
  [INDEX_BOOST]: indexBoost => (
    r => {
      ...r,
      index_boosts: [ ...r.index_boosts, indexBoost ],
    }
  ),
  [FEATURE_BOOST]: featureBoost => (
    r => {
      ...r,
      feature_boosts: [ ...r.feature_boosts, featureBoost ],
    }
  ),
  [TRANSFORM]: transform => (
    r => {
      ...r,
      transforms: [ ...r.transforms, transform ],
    }
  ),
  [AGGREGATE]: aggregate => (
    r => {
      ...r,
      aggregates: [ ...r.aggregates, aggregate ],
    }
  ),
  [CLICK_TOKENS]: field => (
    r => {
      ...r,
      token_key_field: field,
      token_type: 'CLICK',
    }
  ),
  [POS_NEG_TOKENS]: field => (
    r => {
      ...r,
      token_key_field: field,
      token_type: 'POS_NEG',
    }
  ),
};

export default builders;
