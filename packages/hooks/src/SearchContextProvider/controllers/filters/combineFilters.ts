import { EVENT_OPTIONS_UPDATED, EVENT_SELECTION_UPDATED } from '../../events';
import { Listener } from '../listener';
import Filter from './Filter';
import { JoinOperator } from './types';

const events = [EVENT_SELECTION_UPDATED, EVENT_OPTIONS_UPDATED];

/**
 * CombineFilters is a helper for combining multiple Filter instances
 * into one.
 *
 * Whenever any of the combined filters are updated, the events are
 * propagated up to the returned "root" filter.
 *
 * @param filters Array of filters to combine.
 * @param  [joinOperator="AND"] Operator to apply between them ("AND" | "OR").
 * @return The resulting Filter.
 */
export default function combineFilters(filters: Filter[], joinOperator: JoinOperator = 'AND') {
  const listeners = {
    [EVENT_SELECTION_UPDATED]: new Listener(),
    [EVENT_OPTIONS_UPDATED]: new Listener(),
  };
  const removeListenerFuncs: (() => void)[] = [];

  function listen(event: string, callback: (filter: Filter) => void): () => void {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return listeners[event].listen(callback);
  }

  filters.forEach((f) => {
    removeListenerFuncs.push(
      f.listen(EVENT_SELECTION_UPDATED, () => {
        listeners[EVENT_SELECTION_UPDATED].notify((listener) => {
          listener();
        });
      }),
      f.listen(EVENT_OPTIONS_UPDATED, () => {
        listeners[EVENT_OPTIONS_UPDATED].notify((listener) => {
          listener();
        });
      }),
    );
  });

  function removeChildFilterListeners() {
    removeListenerFuncs.forEach((fn) => fn());
  }

  // Generate filter field from non aggregate count Filter(s) for Variables object
  const filter = () => {
    return filters
      .filter((f) => !f.getCount())
      .map((f) => f.filter())
      .filter(Boolean)
      .join(` ${joinOperator} `);
  };

  // Generate buckets field from non aggregate count Filter(s) for Variables object
  const buckets = () => {
    return filters
      .filter((f) => !f.getCount())
      .map((f) => f.getBuckets())
      .filter(Boolean)
      .join(',');
  };

  // Generate countFilters field from aggregate count Filter(s) for Variables object
  const countFilters = () => {
    return filters
      .filter((f) => f.getCount())
      .map((f) => f.filter())
      .join(',');
  };

  // Generate count field from aggregate count Filter(s) for Variables object
  const count = () => {
    return filters
      .filter((f) => f.getCount())
      .map((f) => f.getField())
      .filter(Boolean)
      .join(',');
  };

  return { filter, listen, buckets, countFilters, count, removeChildFilterListeners };
}
