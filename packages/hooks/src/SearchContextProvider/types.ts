import { Config } from './config';
import { Pipeline, Response, Values } from './controllers';

export type SearchFn = (query: string, override: boolean) => void;
export type ClearFn = (values?: { [k: string]: string | undefined }) => void;
export type ResultClickedFn = (url: string) => void;
export type PaginateFn = (page: number) => void;

export interface PipelineContextState {
  response: Response | null;
  query: string;
  completion: string;
  suggestions: string[];
  config: Config;
  search: SearchFn;
  clear: ClearFn;
  fields?: Fields;
  values: Values;
}

export interface ProviderPipelineConfig {
  pipeline: Pipeline;
  values: Values;
  config?: Config;
  fields?: Fields;
}

export interface ProviderPipelineState {
  response: Response | null;
  query: string;
  config: Config;
  completion: string;
  suggestions: string[];
}

export interface Fields {
  title?: string;
  description?: string;
  price?: string;
  rating?: string;
  category?: string;
}

export interface PipelineProviderProps {
  search: ProviderPipelineConfig;
  instant?: ProviderPipelineConfig;
  searchOnLoad?: boolean;
}

export interface PipelineProviderState {
  search: ProviderPipelineState;
  instant: ProviderPipelineState;
}

export interface Context {
  search: PipelineContextState;
  instant: PipelineContextState;

  resultClicked: ResultClickedFn;
  paginate: PaginateFn;
}

export interface State {
  response: Response | null;
  query: string;
  completion: string;
  suggestions: string[];
  config: Config;
}
