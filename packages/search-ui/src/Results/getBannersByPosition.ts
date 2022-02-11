import { Banner } from '@sajari/sdk-js';

import { BannerByPosition } from './types';

export function getBannersByPosition(banners: Banner[], resultsPerPage: number, page: number) {
  return banners.reduce<BannerByPosition>((result, banner) => {
    const { position = 0 } = banner;
    if (position > (page - 1) * resultsPerPage && position <= page * resultsPerPage) {
      Object.assign(result, { [position - (page - 1) * resultsPerPage - 1]: banner });
    }
    return result;
  }, {});
}
