import { Box } from '@sajari/react-components';
import { ClickTracking, useTracking } from '@sajari/react-hooks';
import { mergeRefs } from '@sajari/react-sdk-utils';
import { useSearchUIContext } from '@sajari/react-search-ui';
import React from 'react';

import { applyClickTracking, applyPosNegTracking } from '../../../utils';
import { useHoverImage } from '../../useHoverImage';
import { useProductImages } from '../../useProductImages';
import { useProductStatus } from '../../useProductStatus';
import { useRenderPrice } from '../../useRenderPrice';
import { TemplateResultProps } from './types';

const TemplateResult = (props: TemplateResultProps) => {
  const { handleResultClicked: onClickProp, posNegLocalStorageManager } = useTracking();
  const { customClassNames, currency, language, viewType, tracking } = useSearchUIContext();
  const {
    render,
    result: { values, token },
    as,
    showVariantImage,
  } = props;
  const { href, onClick: clickTrackingOnClick } = applyClickTracking({ token, tracking, values, onClick: onClickProp });
  const { onClick: posNegOnClick } = applyPosNegTracking({
    token,
    tracking,
    values,
    onClick: onClickProp,
    posNegLocalStorageManager,
  });
  const onClick = tracking instanceof ClickTracking ? clickTrackingOnClick : posNegOnClick;
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
  const rendered = render({ ...{ ...values, url: href ?? values.url }, productStatus, productPrice });
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
