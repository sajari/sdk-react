import { isArray } from '@sajari/react-sdk-utils';

import { ImageProvider } from './types';

interface Params {
  provider: ImageProvider;
  images?: string | Array<string | undefined>;
  width?: number | string;
  height?: number | string;
}

export default function useImageProvider(params: Params) {
  const { provider, width, height, images: imagesParam = [] } = params;
  const images = isArray(imagesParam) ? (imagesParam.filter(Boolean) as Array<string>) : [imagesParam];
  if (!provider) {
    return images;
  }

  switch (provider) {
    case 'shopify':
      return images.map((i) => {
        const url = new URL(i);
        const { pathname } = url;
        const [extension, ...rest] = pathname.split('.').reverse();
        const pathnameWithoutExtension = rest.join();
        if (width && height) {
          url.pathname = `${pathnameWithoutExtension}_${width}x${height}`;
        } else if (width) {
          url.pathname = `${pathnameWithoutExtension}_${width}x`;
        } else if (height) {
          url.pathname = `${pathnameWithoutExtension}_x${width}`;
        }
        url.pathname = `${url.pathname}.${extension}`;
        return url.toString();
      });
    default:
      return images;
  }
}
