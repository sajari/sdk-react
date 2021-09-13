import { isArray } from '@sajari/react-sdk-utils';
import { useCallback, useEffect, useState } from 'react';

import { ResultViewType } from '../ContextProvider';
import { TemplateResultProps } from './components/TemplateResult/types';
import { ResultValues } from './types';

interface Props extends Pick<TemplateResultProps, 'showVariantImage'> {
  viewType: ResultViewType;
  values: ResultValues;
}

const baseStyle = {
  display: 'flex',
  'flex-wrap': 'wrap',
  gap: '0.25rem',
  width: '100%',
  'margin-top': '0.5rem',
};

const gridStyle = {
  ...baseStyle,
  'margin-right': 'auto',
  'margin-left': 'auto',
  'justify-content': 'center',
  'max-width': 'fit-content',
};

const listStyle = {
  ...baseStyle,
  'margin-right': 'unset',
  'margin-left': 'unset',
  'justify-content': 'unset',
  'max-width': 'unset',
};

const imgStyle = {
  outerContainer: {
    width: '2.25rem',
    height: '2.25rem',
    outline: 'transparent solid 2px',
    'outline-offset': '2px',
    'border-radius': '0.375rem',
    padding: '0.125rem',
    'border-color': 'transparent',
  },
  innerContainer: {
    position: 'relative',
    'border-radius': '0.125rem',
  },
  pseudoElement: {
    'padding-bottom': 'calc(100%)',
    display: 'block',
    height: '0px',
  },
  img: {
    'object-fit': 'cover',
    'object-position': 'center top',
    'border-radius': 'inherit',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
  },
};

function getCreateImageElementFunc(setIndex: (i: number) => void) {
  return function createImageElement(src: string, i: number) {
    const imgContainer = document.createElement('div');
    imgContainer.setAttribute('role', 'img');
    imgContainer.tabIndex = 0;
    Object.entries(imgStyle.outerContainer).forEach(([key, value]) => {
      imgContainer.style.setProperty(key, value);
    });

    const innerContainer = document.createElement('div');
    innerContainer.dataset.sjVariantImage = '';
    Object.entries(imgStyle.innerContainer).forEach(([key, value]) => {
      innerContainer.style.setProperty(key, value);
    });

    const img = document.createElement('img');
    img.src = src;
    img.loading = 'lazy';
    img.addEventListener('mouseenter', () => {
      setIndex(i);
    });
    Object.entries(imgStyle.img).forEach(([key, value]) => {
      img.style.setProperty(key, value);
    });

    innerContainer.appendChild(img);
    imgContainer.appendChild(innerContainer);

    return imgContainer;
  };
}

type UseProductImagesOutput = {
  onRefChange: (element: HTMLElement | null) => void;
  activeImageIndex: number;
};

export function useProductImages(props: Props): UseProductImagesOutput {
  const { viewType, values, showVariantImage } = props;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const onRefChange = useCallback<UseProductImagesOutput['onRefChange']>((element) => {
    if (element) {
      setNode(element);
      const containerElement = element.querySelector('div[data-sj-product-images-container]') as HTMLElement;
      setContainer(containerElement);
    }
  }, []);

  useEffect(() => {
    switch (viewType) {
      case 'grid':
        if (container && showVariantImage) {
          Object.entries(gridStyle).forEach(([key, value]) => {
            container.style.setProperty(key, value);
          });
        }
        break;
      case 'list':
      default:
        if (container && showVariantImage) {
          Object.entries(listStyle).forEach(([key, value]) => {
            container.style.setProperty(key, value);
          });
        }
        break;
    }
  }, [viewType, container, showVariantImage]);

  useEffect(() => {
    if (node) {
      const img = node.querySelector('img[data-sj-first-image]') as HTMLImageElement;
      const { image } = values;
      if (img && isArray(image) && image[activeImageIndex]) {
        img.src = image[activeImageIndex];
      }
    }
  }, [activeImageIndex]);

  useEffect(() => {
    const { image } = values;
    let style = document.querySelector('#sj-result-template-default-style');
    if (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      if (showVariantImage && isArray(image)) {
        if (!style) {
          style = document.createElement('style');
          style.id = 'sj-result-template-default-style';
          style.textContent = `
        [data-sj-variant-image]::before {
          padding-bottom: calc(100%);
          content: "";
          display: block;
          height: 0px;
        }
      `;
          document.head.appendChild(style);
        }
        const images = image.map(getCreateImageElementFunc(setActiveImageIndex));
        const fragment = document.createDocumentFragment();
        images.forEach((img) => {
          fragment.appendChild(img);
        });
        container.appendChild(fragment);
      }
    }
  }, [container, showVariantImage]);

  return { onRefChange, activeImageIndex };
}
