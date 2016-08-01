import KeyMirror from "keymirror";

let _components = KeyMirror({
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
let _componentKeys = [];

for (const k in _components) {
  _componentKeys.push(k);
}

_components.list = _componentKeys;

export default _components;
