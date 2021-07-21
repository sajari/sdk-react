export interface Config {
  qParam: string;
  qOverrideParam: string;
  qSuggestionsParam: string;
  resultsPerPageParam: string;
  pageParam: string;
  maxSuggestions: number;
  fieldsParam: string;
}

export const defaultConfig: Config = {
  qParam: 'q',
  qOverrideParam: 'q.override',
  qSuggestionsParam: 'q.suggestions',
  resultsPerPageParam: 'resultsPerPage',
  pageParam: 'page',
  maxSuggestions: 10,
  fieldsParam: 'fields',
};
