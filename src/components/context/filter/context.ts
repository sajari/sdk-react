import createReactContext from "create-react-context";
import * as React from "react";
import { IOptions } from "../../../controllers/filter";

export interface IFilterContext {
  options: IOptions;
  selected: string[];
  set: (key: string, value: boolean) => void;
}

export const Context = createReactContext({} as IFilterContext);
