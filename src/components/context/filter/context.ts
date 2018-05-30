import createReactContext from "create-react-context";
import * as React from "react";
import { Options } from "../../../controllers/filter";

export interface FilterContext {
  options: Options;
  selected: string[];
  set: (key: string, value: boolean) => void;
}

export const Context = createReactContext({} as FilterContext);
