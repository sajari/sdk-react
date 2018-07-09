import * as React from "react";
import { Options } from "../../../controllers/filter";

export interface FilterContext {
  options: Options;
  selected: string[];
  set: (key: string, value: boolean) => void;
}

export const Context = React.createContext({} as FilterContext);
