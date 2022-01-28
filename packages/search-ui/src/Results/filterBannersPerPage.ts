import { Banner } from '@sajari/sdk-js';

export function filterBannersPerPage(banners: Banner[], resultsPerPage: number, page: number) {
  return banners
    .filter(({ position = 0 }) => position > (page - 1) * resultsPerPage && position <= page * resultsPerPage)
    .map(({ position = 0, ...rest }) => ({ ...rest, position: position - (page - 1) * resultsPerPage }));
}
