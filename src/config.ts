export interface Config {
  qParam: string;
  qOverrideParam: string;
  qSuggestionsParam: string;
  maxSuggestions: number;
  resultsPerPageParam: string;
  pageParam: string;
}

export const defaultConfig: Config = {
  maxSuggestions: 5,
  qOverrideParam: "q.override",
  qParam: "q",
  qSuggestionsParam: "q.suggestions",
  resultsPerPageParam: "resultsPerPage",
  pageParam: "page"
};
