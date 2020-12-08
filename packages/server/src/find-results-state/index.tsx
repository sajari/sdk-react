import { combineFilters, EVENT_RESPONSE_UPDATED, SearchProviderValues, Variables } from '@sajari/react-hooks';
import { isEmpty } from '@sajari/react-sdk-utils';
import React from 'react';
import { renderToString } from 'react-dom/server';

function findResultsState(App: React.ElementType, props: SearchProviderValues) {
  if (!props.search) {
    throw new Error('findResultsState requires a `search` config');
  }

  // Alogolia does this, although I don't understand the point of it if it's not assigning to something
  renderToString(<App />);

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
      resolve(response);
    });

    pipeline.search(variables.get());
  });
}

export default findResultsState;
