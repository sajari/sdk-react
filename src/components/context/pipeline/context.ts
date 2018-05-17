import createReactContext from "create-react-context";
import * as React from "react";
import { IConfig } from "../../../config";
import { Response } from "../../../controllers";

export type SearchFn = (query: string, override: boolean) => void;
export type ResultClickedFn = (url: string) => void;
export type PaginateFn = (page: number) => void;

export interface IContext {
  search: {
    response: Response | null;
    query: string;
    completion: string;
    suggestions: string[];
    config: IConfig;
    search: SearchFn;
  };
  instant: {
    response: Response | null;
    query: string;
    completion: string;
    suggestions: string[];
    config: IConfig;
    search: SearchFn;
  };

  resultClicked: ResultClickedFn;
  paginate: PaginateFn;
}

export const Context = createReactContext({} as IContext);
