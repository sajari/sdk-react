export interface IConfig {
  qParam: string;
  qOverrideParam: string;
  qSuggestionsParam: string;
  maxSuggestions: number;
}

export const defaultConfig = {
  maxSuggestions: 5,
  qOverrideParam: "q.override",
  qParam: "q",
  qSuggestionsParam: "q.suggestions"
};
