/* eslint-disable @typescript-eslint/no-explicit-any */
import { Config } from './Config';
import { FilterBuilder, Pipeline, RangeFilterBuilder, Response, Variables } from './controllers';

export type SearchFn = (query?: string, override?: boolean) => void;
export type ClearFn = (variables?: { [k: string]: string | undefined }) => void;
export type ResetFiltersFn = (emitEvent?: boolean) => void;
export type ResultClickedFn = (args: { token: string; values: ResultValues }) => void;
export type PaginateFn = (page: number) => void;

export interface PipelineContextState {
  variables: Variables;
  pipeline: Pipeline;
  response: Response | null;
  query: string;
  completion: string;
  suggestions: string[];
  config: Config;
  search: SearchFn;
  clear: ClearFn;
  resetFilters: ResetFiltersFn;
  fields?: FieldDictionary;
  searching: boolean;
  filters?: (FilterBuilder | RangeFilterBuilder)[];
}

export interface ProviderPipelineConfig {
  pipeline: Pipeline;
  variables?: Variables;
  config?: Config;
  fields?: FieldDictionary;
  filters?: (FilterBuilder | RangeFilterBuilder)[];
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
  autocomplete?: ProviderPipelineConfig;
  defaultFilter?: string;
  searchOnLoad?: boolean;
  initialResponse?: string;
}

export interface PipelineProviderState {
  search: ProviderPipelineState;
  autocomplete: ProviderPipelineState;
}

export interface Context {
  search: PipelineContextState;
  autocomplete: PipelineContextState;
  resultClicked: ResultClickedFn;
  paginate: PaginateFn;
}

export interface ResultValues {
  _id: string;
  url: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string | Array<string>;
  rating?: number;
  price?: string | Array<string>;
  originalPrice?: string | Array<string>;
}

type Field = ((data: Record<string, any>) => any) | string | string[] | false;
export class FieldDictionary {
  internalId?: Field;

  url?: Field;

  title?: Field;

  subtitle?: Field;

  description?: Field;

  image?: Field;

  // e-commerce related fields

  price?: Field;

  originalPrice?: Field;

  rating?: Field;

  constructor(input?: FieldDictionary) {
    const {
      internalId = '_id',
      url = 'url',
      title = 'title',
      subtitle = 'url',
      description = 'description',
      image = 'image',
      price = 'price',
      originalPrice = 'originalPrice',
      rating = 'rating',
    } = input ?? {};

    this.internalId = internalId;
    this.url = url;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.image = image;
    this.price = price;
    this.originalPrice = originalPrice;
    this.rating = rating;
  }
}
