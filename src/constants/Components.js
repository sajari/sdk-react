import keyMirror from 'keymirror';

const components = keyMirror({
  BODY: null,
  PAGE: null,
  MAXRESULTS: null,
  FILTER: null,
  FIELDS: null,
  SORT: null,
  META_BOOST: null,
  INDEX_BOOST: null,
  TRANSFORMS: null,
  AGGREGATE: null,
});

// List of the keys to use as react proptypes check
const componentKeys = Object.keys(components);

components.list = componentKeys;

export default components;
