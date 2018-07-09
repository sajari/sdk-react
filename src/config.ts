export interface Config {
  qParam: string;
  qOverrideParam: string;
  qSuggestionsParam: string;
  maxSuggestions: number;
  resultsPerPageParam: string;
  pageParam: string;
}

export const defaultConfig: Config = {
  qParam: "q",
  qOverrideParam: "q.override",
  qSuggestionsParam: "q.suggestions",
  maxSuggestions: 5,
  resultsPerPageParam: "resultsPerPage",
  pageParam: "page"
};
