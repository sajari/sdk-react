import { isArray } from '@sajari/react-sdk-utils';
import { useCallback, useEffect, useState } from 'react';

import { TemplateResultProps } from './components/TemplateResult/types';
import { ResultValues } from './types';

interface Props extends Pick<TemplateResultProps, 'showVariantImage'> {
  image: ResultValues['image'];
}

type UseHoverImageOutput = (element: HTMLElement | null) => void;

export function useHoverImage(props: Props): UseHoverImageOutput {
  const { image: imageProp, showVariantImage } = props;
  const hoverImageSrc = isArray(imageProp) ? imageProp[1] : undefined;
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [secondImage, setSecondImage] = useState<HTMLImageElement | null>(null);

  const onRefChange = useCallback<UseHoverImageOutput>((element) => {
    const node = element;
    if (node) {
      const img = node.querySelector('img[data-sj-first-image]') as HTMLImageElement;
      setImage(img);
    }
  }, []);

  const onMouseEnter = useCallback(() => {
    if (image && secondImage && !showVariantImage) {
      image.style.opacity = '0%';
      secondImage.style.opacity = '100%';
    } else if (image) {
      image.style.opacity = '70%';
    }
  }, [image, secondImage, showVariantImage]);

  const onMouseLeave = useCallback(() => {
    if (image && secondImage && !showVariantImage) {
      image.style.opacity = '100%';
      secondImage.style.opacity = '0%';
    } else if (image) {
      image.style.opacity = '100%';
    }
  }, [image, secondImage, showVariantImage]);

  useEffect(() => {
    if (hoverImageSrc && image && !showVariantImage) {
      const secondImageElement = document.createElement('img');
      secondImageElement.src = hoverImageSrc;
      secondImageElement.dataset.sjSecondImage = '';
      secondImageElement.style.transition = 'opacity 0.2s ease-in';
      secondImageElement.style.opacity = '0%';
      secondImageElement.style.position = 'absolute';
      secondImageElement.style.top = '0';
      secondImageElement.style.left = '0';
      secondImageElement.style.height = '100%';
      secondImageElement.style.width = '100%';
      secondImageElement.style.objectFit = 'contain';
      secondImageElement.style.objectPosition = 'center';
      setSecondImage(secondImageElement);
      image.insertAdjacentElement('beforebegin', secondImageElement);
    }
  }, [hoverImageSrc, image, showVariantImage]);

  useEffect(() => {
    if (showVariantImage && secondImage && image) {
      secondImage.remove();
      image.style.removeProperty('transtion');
      image.style.removeProperty('opacity');
    }
  }, [showVariantImage]);

  useEffect(() => {
    if (image) {
      if (!showVariantImage) {
        image.style.transition = 'opacity 0.2s ease-in';
        image.style.opacity = '100%';
      }
      image.addEventListener('mouseenter', onMouseEnter);
      image.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      image?.removeEventListener('mouseenter', onMouseEnter);
      image?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [image, onMouseEnter, onMouseLeave]);

  return onRefChange;
}
