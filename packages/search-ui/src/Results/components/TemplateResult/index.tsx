import { Box } from '@sajari/react-components';
import { mergeRefs } from '@sajari/react-sdk-utils';
import React from 'react';

import { useSearchUIContext } from '../../../ContextProvider';
import { useHoverImage } from '../../useHoverImage';
import { useProductImages } from '../../useProductImages';
import { useProductStatus } from '../../useProductStatus';
import { useRenderPrice } from '../../useRenderPrice';
import { TemplateResultProps } from './types';

const TemplateResult = (props: TemplateResultProps) => {
  const { customClassNames, currency, language, viewType, tracking } = useSearchUIContext();
  const {
    render,
    result: { values, token },
    as,
    showVariantImage,
  } = props;
  const href = tracking.getResultHref(values, token);
  const onClick = () => tracking.onResultClick(values, token);
  const mouseDownHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.button === 1) {
      onClick();
    }
  };
  const { onRefChange: onRefChangeProductImages, activeImageIndex } = useProductImages({
    viewType,
    values,
    showVariantImage,
  });
  const productStatus = useProductStatus({
    activeImageIndex,
    values,
  });
  const productPrice = useRenderPrice({
    values,
    currency,
    language,
    onSale: productStatus.onSale,
    activeImageIndex,
  });
  const rendered = render({
    ...{ ...values, url: href ?? values.url },
    productStatus,
    productPrice,
    variantIndex: activeImageIndex,
  });
  const onRefChangeHoverImage = useHoverImage({ image: values.image, showVariantImage });
  const ref = mergeRefs(onRefChangeHoverImage, onRefChangeProductImages);

  return (
    <Box
      onClick={onClick}
      onMouseDown={mouseDownHandler}
      ref={ref}
      as={as}
      className={customClassNames.results?.template?.resultContainer}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};

export default TemplateResult;
