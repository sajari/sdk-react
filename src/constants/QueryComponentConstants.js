import keyMirror from 'keymirror';

const components = keyMirror({
  BODY: null,
  OFFSET: null,
  LIMIT: null,
  FILTER: null,
  FIELDS: null,
  SORT: null,
  FIELD_BOOSTS: null,
  INSTANCE_BOOSTS: null,
  TRANSFORM: null,
  AGGREGATE: null,
  CLICK_TOKENS: null,
  POS_NEG_TOKENS: null,
  TRACKING_RESET: null,
  FEATURE_BOOST: null,
});

// List of the keys to use as react proptypes check
const componentKeys = Object.keys(components);

components.list = componentKeys;

export default components;
