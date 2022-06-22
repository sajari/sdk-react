export interface StateSyncURLParamConfig {
  q: string;
  resultsPerPage: string;
  page: string;
  sort: string;
}

export const defaultURLParamKeys: StateSyncURLParamConfig = {
  q: 'q',
  resultsPerPage: 'show',
  page: 'page',
  sort: 'sort',
};
