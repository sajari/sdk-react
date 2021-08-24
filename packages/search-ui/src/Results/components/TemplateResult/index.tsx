import { Box } from '@sajari/react-components';
import { mergeRefs } from '@sajari/react-sdk-utils';
import { useSearchUIContext } from '@sajari/react-search-ui';
import React from 'react';

import { useHoverImage } from '../../useHoverImage';
import { useProductImages } from '../../useProductImages';
import { useProductStatuses } from '../../useProductStatuses';
import { useRenderPrice } from '../../useRenderPrice';
import { TemplateResultProps } from './types';

const TemplateResult = (props: TemplateResultProps) => {
  const { customClassNames, currency, language, viewType } = useSearchUIContext();
  const { render, values, as, showVariantImage } = props;
  const { onRefChange: onRefChangeProductImages, activeImageIndex } = useProductImages({
    viewType,
    values,
    showVariantImage,
  });
  const productStatuses = useProductStatuses({
    activeImageIndex,
    values,
  });
  const renderPriceData = useRenderPrice({
    values,
    currency,
    language,
    isOnSale: productStatuses.isOnSale,
    activeImageIndex,
  });
  const rendered = render({ ...values, productStatuses, renderPriceData });
  const onRefChangeHoverImage = useHoverImage({ image: values.image, showVariantImage });
  const ref = mergeRefs(onRefChangeHoverImage, onRefChangeProductImages);

  return (
    <Box
      ref={ref}
      as={as}
      className={customClassNames.results?.template?.resultContainer}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};

export default TemplateResult;
