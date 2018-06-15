import { Result } from "@sajari/sdk-js";
import createReactContext from "create-react-context";
import * as React from "react";

import { ClearFn, SearchFn } from "../../context/pipeline/context";
import { ProviderState } from "./Provider";

export type SetStateFn = (
  newState: ProviderState,
  callback?: (state: ProviderState) => void
) => void;

export interface InputContext {
  inputValue: string; // current raw contents of the input box
  highlightedIndex: number; // current result or suggestion item highlighted
  isDropdownOpen: boolean; // whether the dropdown should be open;

  getInputProps: (props: { [k: string]: any }) => { [k: string]: any };
  setHighlightedIndex: (index: number) => void;
  setState: SetStateFn;

  query: string;
  completion: string;
  suggestions: string[];
  results: Result[];

  pipelines: {
    search: {
      search: SearchFn;
      clear: ClearFn;
    };
    instant: {
      search: SearchFn;
      clear: ClearFn;
    };
  };

  aria: {
    announcePolite: (message: string) => void;
    announceAssertive: (message: string) => void;
  };
}

export const Context = createReactContext({} as InputContext);
