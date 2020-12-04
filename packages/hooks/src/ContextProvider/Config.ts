export interface Config {
  qParam: string;
  qOverrideParam: string;
  qSuggestionsParam: string;
  resultsPerPageParam: string;
  pageParam: string;
  maxSuggestions: number;
}

export const defaultConfig: Config = {
  qParam: 'q',
  qOverrideParam: 'q.override',
  qSuggestionsParam: 'q.suggestions',
  resultsPerPageParam: 'resultsPerPage',
  pageParam: 'page',
  maxSuggestions: 10,
};
