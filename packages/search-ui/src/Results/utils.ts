import { Banner } from '@sajari/sdk-js';

export function isBanner(resultOrBanner: any): resultOrBanner is Banner {
  return 'position' in resultOrBanner && 'width' in resultOrBanner && 'height' in resultOrBanner;
}
