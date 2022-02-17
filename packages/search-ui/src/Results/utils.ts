import { Banner } from '@sajari/sdk-js';

export function isBanner(resultOrBanner: any): resultOrBanner is Banner {
  return 'position' in resultOrBanner && 'width' in resultOrBanner && 'height' in resultOrBanner;
}

export function mergeBannersWithResults<T = any>(banners: Banner[], results: T[]): (Banner | T)[] {
  const clonedBanners = [...banners].sort((a, b) => {
    const positionA = a.position || 0;
    const positionB = b.position || 0;
    if (positionA < positionB) {
      return -1;
    }
    if (positionA > positionB) {
      return 1;
    }
    return 0;
  });
  const clonedResults = [...results];
  let count = 0;
  const list: (Banner | T)[] = [];
  const total = clonedBanners.length + clonedResults.length;
  while (count < total) {
    if (clonedBanners[0] && clonedBanners[0].position !== undefined && clonedBanners[0].position - 1 <= count) {
      const banner = clonedBanners.shift();
      if (banner) {
        list.push(banner);
      }
    } else {
      const result = clonedResults.shift();
      if (result) {
        list.push(result);
      }
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
