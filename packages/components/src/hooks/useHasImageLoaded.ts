import { isSSR } from '@sajari/react-sdk-utils';
import { useEffect, useRef, useState } from 'react';

import { ImageProps } from '../Image/types';

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
    if (!src || isSSR()) {
      return;
    }

    const image = new window.Image();

    image.addEventListener('load', (event) => {
      if (ref.current) {
        setHasLoaded(true);

        if (onLoad) {
          onLoad.call(image, event);
        }
      }
    });

    image.addEventListener('error', (event) => {
      if (ref.current) {
        setHasLoaded(false);

        if (onError) {
          onError.call(image, event);
        }
      }
    });

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
