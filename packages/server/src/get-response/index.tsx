import { combineFilters, EVENT_RESPONSE_UPDATED, SearchProviderValues, Variables } from '@sajari/react-hooks';
import { isEmpty } from '@sajari/react-sdk-utils';

function getResponse(props: SearchProviderValues): Promise<string> {
  if (!props.search) {
    throw new Error('findResultsState requires a `search` config');
  }

  const { pipeline, filters, variables = new Variables() } = props.search;

  if (filters) {
    const filter = combineFilters(filters);

    variables.set({
      filter: isEmpty(filter.filter()) ? '_id != ""' : () => filter.filter(),
      countFilters: () => filter.countFilters(),
      buckets: () => filter.buckets(),
      count: () => filter.count(),
    });
  }

  return new Promise((resolve) => {
    const unlisten = pipeline.listen(EVENT_RESPONSE_UPDATED, (response) => {
      unlisten();

      const serialized = JSON.stringify({
        queryValues: Object.fromEntries(response.getQueryValues()),
        response: Object.fromEntries(response.getResponse()),
        values: Object.fromEntries(response.getValues()),
      });

      resolve(serialized);
    });

    pipeline.search(variables.get());
  });
}

export default getResponse;
