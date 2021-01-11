import { combineFilters, EVENT_RESPONSE_UPDATED, Response, SearchProviderValues, Variables } from '@sajari/react-hooks';
import { isEmpty } from '@sajari/react-sdk-utils';

function search(
  params: SearchProviderValues['search'],
  defaultFilter: SearchProviderValues['defaultFilter'],
): Promise<string | null> {
  if (!params) {
    throw new Error('findResultsState requires a `search` config');
  }

  const { pipeline, filters, variables = new Variables() } = params;
  const filter = combineFilters(filters ?? []);

  variables.set({
    filter: () => {
      const expression = filter.filter();

      return `${defaultFilter ? `${defaultFilter.toString()} AND ` : ''}(${
        isEmpty(expression) ? '_id != ""' : expression
      })`;
    },
    countFilters: () => filter.countFilters(),
    buckets: () => filter.buckets(),
    count: () => filter.count(),
  });

  return new Promise((resolve) => {
    const unlisten = pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) => {
      unlisten();

      if (!response || response.isError()) {
        resolve(null);
        return;
      }

      const serialized = JSON.stringify({
        queryValues: Object.fromEntries(response.getQueryValues() ?? []),
        response: Object.fromEntries(response.getResponse() ?? []),
        values: Object.fromEntries(response.getValues() ?? []),
      });

      resolve(serialized);
    });

    pipeline.search(variables.get());
  });
}

export default search;
