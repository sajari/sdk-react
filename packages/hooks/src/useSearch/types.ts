import { Result } from '@sajari/sdk-js';
import { Pipeline, Values } from '../SearchContextProvider';
import { Fields } from '../SearchContextProvider/types';

export type UseSearchParams = string | UseSearchCustomConfig;

export type UseSearchCustomConfig = { pipeline: Pipeline; values: Values; fields?: Record<string, string> & Fields };

export interface UseSearchResult {
  latency?: number;
  totalResults?: number;
  results?: Result[];
  search: (q?: string) => void;
  loading: boolean;
  error: Error | null;
}
