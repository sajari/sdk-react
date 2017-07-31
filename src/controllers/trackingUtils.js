import { Tracking } from "sajari";

import { valuesChangedEvent } from "./";

const initWebsiteTracking = (values, tracking, paramQ = "q") => {
  let prevQ = "";
  return values.listen(valuesChangedEvent, changed => {
    if (changed.q === undefined) {
      return;
    }

    const newQ = changed.q;
    const first3CharactersChanged = !newQ.startsWith(
      prevQ.substr(0, Math.min(newQ.length, 3))
    );
    const queryCleared = prevQ.length > 0 && newQ.length === 0;
    if (first3CharactersChanged || queryCleared) {
      tracking.reset();
    }

    prevQ = newQ;
  });
};

/**
 * Creates a new click tracking analytics object.
 * @param {string|undefined} [field="url"] Unique field to use for tracking.
 */
const ClickTracking = (field = "url") => {
  const tracking = new Tracking();
  tracking.clickTokens(field);
  return tracking;
};

export { initWebsiteTracking, ClickTracking };
