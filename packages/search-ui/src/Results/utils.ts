import { Banner } from '@sajari/sdk-js';

export function isBanner(resultOrBanner: any): resultOrBanner is Banner {
  return 'position' in resultOrBanner && 'width' in resultOrBanner && 'height' in resultOrBanner;
}

export function mergeBannersWithResults<T = any>(banners: Banner[], results: T[]): (Banner | T)[] {
  const sortedBanners = [...banners].sort((a, b) => {
    const positionA = a.position || 0;
    const positionB = b.position || 0;

    return positionA - positionB;
  });
  let count = 0;
  const list: (Banner | T)[] = [];
  const total = sortedBanners.length + results.length;
  let currentResultIndex = 0;
  let currentBannerIndex = 0;
  while (count < total) {
    const banner = sortedBanners[currentBannerIndex];
    if (banner && banner.position !== undefined && banner.position - 1 <= count) {
      list.push(sortedBanners[currentBannerIndex]);
      currentBannerIndex += 1;
    } else {
      list.push(results[currentResultIndex]);
      currentResultIndex += 1;
    }
    count += 1;
  }

  return list;
}

export function filterBannersPerPage(banners: Banner[], resultsPerPage: number, page: number) {
  return banners
    .filter(({ position = 0 }) => position > (page - 1) * resultsPerPage && position <= page * resultsPerPage)
    .map(({ position = 0, ...rest }) => ({ ...rest, position: position - (page - 1) * resultsPerPage }));
}
