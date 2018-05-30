import createReactContext from "create-react-context";
import * as React from "react";
import { Config } from "../../../config";
import { Response } from "../../../controllers";

export type SearchFn = (query: string, override: boolean) => void;
export type ResultClickedFn = (url: string) => void;
export type PaginateFn = (page: number) => void;

export interface PipelineContextState {
  response: Response | null;
  query: string;
  completion: string;
  suggestions: string[];
  config: Config;
  search: SearchFn;
}

export interface Context {
  search: PipelineContextState;
  instant: PipelineContextState;

  resultClicked: ResultClickedFn;
  paginate: PaginateFn;
}

export const PipelineContext = createReactContext({} as Context);
