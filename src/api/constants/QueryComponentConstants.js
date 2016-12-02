const components = {
  BODY: 'BODY',
  OFFSET: 'OFFSET',
  LIMIT: 'LIMIT',
  FILTER: 'FILTER',
  FIELDS: 'FIELDS',
  SORT: 'SORT',
  FIELD_BOOSTS: 'FIELD_BOOSTS',
  INSTANCE_BOOSTS: 'INSTANCE_BOOSTS',
  TRANSFORM: 'TRANSFORM',
  AGGREGATE: 'AGGREGATE',
  CLICK_TOKENS: 'CLICK_TOKENS',
  POS_NEG_TOKENS: 'POS_NEG_TOKENS',
  TRACKING_RESET: 'TRACKING_RESET',
  FEATURE_BOOST: 'FEATURE_BOOST',
}

// List of the keys to use as react proptypes check
const componentKeys = Object.keys(components)

components.list = componentKeys

export default components
