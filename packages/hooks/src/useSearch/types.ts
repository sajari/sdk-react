import { Result } from '@sajari/sdk-js';

import { Pipeline, Variables } from '../SearchContextProvider';
import { FieldDictionary } from '../SearchContextProvider/types';

export type UseSearchParams = string | UseSearchCustomConfig;

export type UseSearchCustomConfig = {
  pipeline: Pipeline;
  variables: Variables;
  fields?: Record<string, string> & FieldDictionary;
};

export interface UseSearchResult {
  latency?: number;
  totalResults?: number;
  results?: Result[];
  search: (q?: string) => void;
  searchInstant?: (q?: string) => void;
  suggestions?: string[];
  loading: boolean;
  error: Error | null;
}
