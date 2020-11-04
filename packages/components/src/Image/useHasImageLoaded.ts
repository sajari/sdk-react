import { useEffect, useRef, useState } from 'react';

import { ImageProps } from './types';

// TODO: Handle load failed fallback

interface HasImageLoadedProps {
  src?: ImageProps['src'];
  onLoad?: ImageProps['onLoad'];
  onError?: ImageProps['onError'];
}

export function useHasImageLoaded(props: HasImageLoadedProps) {
  const { src, onLoad, onError } = props;
  const ref = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      return;
    }

    const image = new window.Image();

    image.onload = (event) => {
      if (ref.current) {
        setHasLoaded(true);

        if (onLoad) {
          // @ts-ignore
          onLoad(event);
        }
      }
    };

    image.onerror = (event) => {
      if (ref.current) {
        setHasLoaded(false);

        if (onError) {
          // @ts-ignore
          onError(event);
        }
      }
    };

    image.src = src;
  }, [src, onLoad, onError]);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      ref.current = false;
    };
  }, []);

  return hasLoaded;
}
