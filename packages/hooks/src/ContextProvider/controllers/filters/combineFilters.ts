import { EVENT_OPTIONS_UPDATED, EVENT_RANGE_UPDATED, EVENT_SELECTION_UPDATED } from '../../events';
import { Listener } from '../Listener';
import FilterBuilder from './FilterBuilder';
import RangeFilterBuilder from './RangeFilterBuilder';
import { JoinOperator } from './types';

const events = [EVENT_SELECTION_UPDATED, EVENT_OPTIONS_UPDATED, EVENT_RANGE_UPDATED];

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
export default function combineFilters(
  filters: (FilterBuilder | RangeFilterBuilder)[],
  joinOperator: JoinOperator = 'AND',
) {
  const listeners = {
    [EVENT_SELECTION_UPDATED]: new Listener(),
    [EVENT_OPTIONS_UPDATED]: new Listener(),
    [EVENT_RANGE_UPDATED]: new Listener(),
  };
  const removeListenerFuncs: (() => void)[] = [];

  function listen(event: string, callback: (filter: FilterBuilder) => void): () => void {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return listeners[event].listen(callback);
  }

  filters.forEach((f) => {
    if (f instanceof FilterBuilder) {
      removeListenerFuncs.push(
        f.listen(EVENT_SELECTION_UPDATED, () => {
          listeners[EVENT_SELECTION_UPDATED].notify((listener) => {
            listener(f);
          });
        }),
        f.listen(EVENT_OPTIONS_UPDATED, () => {
          listeners[EVENT_OPTIONS_UPDATED].notify((listener) => {
            listener(f);
          });
        }),
      );
    }
    if (f instanceof RangeFilterBuilder) {
      removeListenerFuncs.push(
        f.listen(EVENT_RANGE_UPDATED, () => {
          listeners[EVENT_RANGE_UPDATED].notify((listener) => {
            listener(f);
          });
        }),
      );
    }
  });

  function removeChildFilterListeners() {
    removeListenerFuncs.forEach((fn) => fn());
  }

  // Generate filter field from non aggregate count Filter(s) for Variables object
  const filter = () => {
    return filters
      .filter((f) => (f instanceof FilterBuilder && !f.getCount()) || f instanceof RangeFilterBuilder)
      .map((f) => f.filter())
      .filter(Boolean)
      .map((f) => `(${f})`)
      .join(` ${joinOperator} `);
  };

  // Generate buckets field from non aggregate count Filter(s) for Variables object
  const buckets = () => {
    return filters
      .filter((f) => f instanceof FilterBuilder && !f.getCount())
      .map((f) => f instanceof FilterBuilder && f.getBuckets())
      .filter(Boolean)
      .join(',');
  };

  // Generate countFilters field from aggregate count Filter(s) for Variables object
  const countFilters = () => {
    return filters
      .filter((f) => f instanceof FilterBuilder && f.getCount())
      .map((f) => f.filter())
      .join(',');
  };

  // Generate count field from aggregate count Filter(s) for Variables object
  const count = () => {
    return filters
      .filter((f) => f instanceof FilterBuilder && f.getCount())
      .map((f) => f instanceof FilterBuilder && f.getField())
      .filter(Boolean)
      .join(',');
  };

  // Generate min field from range Filter(s) for Variables object
  const min = () => {
    return filters
      .filter((f) => f instanceof RangeFilterBuilder && f.isAggregate())
      .map((f) => f.getField())
      .join(',');
  };

  // Generate max field from range Filter(s) for Variables object
  const max = () => {
    return filters
      .filter((f) => f instanceof RangeFilterBuilder && f.isAggregate())
      .map((f) => f.getField())
      .join(',');
  };

  return { filter, listen, buckets, countFilters, count, removeChildFilterListeners, max, min };
}
