import { Result } from '@sajari/sdk-js';

import { Pipeline, Variables } from '../SearchContextProvider';
import { FieldDictionary } from '../SearchContextProvider/types';

export type UseSearchConfig = {
  queryOverride?: string;
  allowEmptySearch?: boolean;
};

export type UseSearchCustomConfig = {
  pipeline: Pipeline;
  variables: Variables;
  fields?: Record<string, string> & FieldDictionary;
};

export type UseSearchParams = UseSearchConfig | UseSearchCustomConfig;

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
