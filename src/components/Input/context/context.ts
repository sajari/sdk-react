import * as React from "react";
import createReactContext from "create-react-context";
import { Result } from "@sajari/sdk-js";

import { SearchFn, ClearFn } from "../../context/pipeline/context";

export interface InputContext {
  inputValue: string;
  isDropdownOpen: boolean;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  selectItem: (search: SearchFn) => (item: string) => void;

  query: string;
  completion: string;
  suggestions: string[];
  results: Result[];

  search: {
    search: SearchFn;
    clear: ClearFn;
  };

  instant: {
    search: SearchFn;
    clear: ClearFn;
  };
}

export const Context = createReactContext({} as InputContext);
