import { isNumber } from '@sajari/react-sdk-utils';
import { CountAggregate } from '@sajari/sdk-js';

import { Response } from '../ContextProvider/controllers';

export function getBucketCount(response: Response | null, value: string): number | null {
  if (!response || response?.isEmpty()) {
    return null;
  }

  let count: number | CountAggregate = 0;
  const aggregates = response.getAggregates();
  const aggregateFilters = response.getAggregateFilters();

  if (aggregateFilters && Object.keys(aggregateFilters.buckets?.count ?? {}).includes(value)) {
    ({ count } = aggregateFilters.buckets);
  } else if (aggregates && Object.keys(aggregates.buckets?.count ?? {}).includes(value)) {
    ({ count } = aggregates.buckets);
  }

  if (isNumber(count)) {
    return 0;
  }

  return (count[value] as number) ?? 0;
}
