import { combineFilters, EVENT_RESPONSE_UPDATED, Response, SearchProviderValues, Variables } from '@sajari/react-hooks';
import { isEmpty } from '@sajari/react-sdk-utils';

function search(props: SearchProviderValues['search']): Promise<string | null> {
  if (!props) {
    throw new Error('findResultsState requires a `search` config');
  }

  const { pipeline, filters, variables = new Variables() } = props;
  const filter = combineFilters(filters ?? []);
  const variablesFilterString = variables.get().filter ?? '';

  variables.set({
    filter: () => {
      const expression = filter.filter();
      return [variablesFilterString, isEmpty(expression) ? '_id != ""' : expression].filter(Boolean).join(' AND ');
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
