import KeyMirror from "keymirror";

let _actions = KeyMirror({
  SET: null,
  REMOVE: null,
});

// List of the keys to use as react proptyes check
let _actionKeys = [];

for (const k in _actions) {
  _actionKeys.push(k);
}

_actions.list = _actionKeys;

export default _actions;
