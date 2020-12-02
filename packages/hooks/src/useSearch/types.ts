import { Result } from '@sajari/sdk-js';

import { Pipeline, Variables } from '../ContextProvider';
import { FieldDictionary } from '../ContextProvider/types';

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
  searching: boolean;
  error: Error | null;
}
