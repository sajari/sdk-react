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

export { initWebsiteTracking };
