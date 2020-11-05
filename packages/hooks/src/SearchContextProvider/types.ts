import { Config } from './config';
import { Filter, Pipeline, Response, Values } from './controllers';

export type SearchFn = (query: string, override?: boolean) => void;
export type ClearFn = (values?: { [k: string]: string | undefined }) => void;
export type ResultClickedFn = (url: string) => void;
export type PaginateFn = (page: number) => void;

export interface PipelineContextState {
  values: Values;
  pipeline: Pipeline;
  response: Response | null;
  query: string;
  completion: string;
  suggestions: string[];
  config: Config;
  search: SearchFn;
  clear: ClearFn;
  fields?: FieldDictionary;
  searching: boolean;
  filters?: Filter[];
}

export interface ProviderPipelineConfig {
  pipeline: Pipeline;
  values: Values;
  config?: Config;
  fields?: FieldDictionary;
  filters?: Filter[];
}

export interface ProviderPipelineState {
  response: Response | null;
  query: string;
  config: Config;
  completion: string;
  suggestions: string[];
}

export interface SearchProviderValues {
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

type Field = ((data: Record<string, any>) => any) | string | string[];
export class FieldDictionary {
  id?: Field;

  url?: Field;

  title?: Field;

  description?: Field;

  price?: Field;

  category?: Field;

  rating?: Field;

  inventory?: Field;

  image?: Field;

  constructor(input?: FieldDictionary) {
    const {
      id = '_id',
      url = 'url',
      title = 'title',
      description = 'description',
      price = 'price',
      category = 'category',
      rating = 'rating',
      inventory = 'inventory',
      image = 'image',
    } = input ?? {};

    this.id = id;
    this.url = url;
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.rating = rating;
    this.inventory = inventory;
    this.image = image;
  }
}
