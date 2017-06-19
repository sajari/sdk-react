/* eslint-disable */
const loaded = function(win, fn) {
  let done = false;
  let top = true;

  const doc = win.document;
  const root = doc.documentElement;
  const modern = doc.addEventListener;

  const add = modern ? "addEventListener" : "attachEvent";
  const rem = modern ? "removeEventListener" : "detachEvent";
  const pre = modern ? "" : "on";

  const init = function(e) {
    if (e.type == "readystatechange" && doc.readyState != "complete") return;
    (e.type == "load" ? win : doc)[rem](pre + e.type, init, false);
    if (!done) {
      done = true;
      fn.call(win, e.type || e);
    }
  };

  const poll = function() {
    try {
      root.doScroll("left");
    } catch (e) {
      setTimeout(poll, 50);
      return;
    }
    init("poll");
  };

  if (doc.readyState == "complete") fn.call(win, "lazy");
  else {
    if (!modern && root.doScroll) {
      try {
        top = !win.frameElement;
      } catch (e) {}
      if (top) poll();
    }
    doc[add](pre + "DOMContentLoaded", init, false);
    doc[add](pre + "readystatechange", init, false);
    win[add](pre + "load", init, false);
  }
};

export default loaded;
