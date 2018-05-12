export interface IConfig {
  qParam: string;
  qOverrideParam: string;
  qSuggestionsParam: string;
  maxSuggestions: number;
}

export const defaultConfig = {
  qParam: "q",
  qOverrideParam: "q.override",
  qSuggestionsParam: "q.suggestions",
  maxSuggestions: 5
};
