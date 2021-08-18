import { Box } from '@sajari/react-components';
import { useSearchUIContext } from '@sajari/react-search-ui';
import React from 'react';

import { useProductStatuses } from '../../useProductStatuses';
import { useRenderPrice } from '../../useRenderPrice';
import { TemplateResultProps } from './types';

const TemplateResult = (props: TemplateResultProps) => {
  const { customClassNames, currency, language } = useSearchUIContext();
  const { render, values, as } = props;
  const productStatuses = useProductStatuses({
    values,
  });
  const renderPriceData = useRenderPrice({ values, currency, language, isOnSale: productStatuses.isOnSale });
  const rendered = render({ ...values, productStatuses, renderPriceData });

  return (
    <Box
      as={as}
      className={customClassNames.results?.template?.resultContainer}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};

export default TemplateResult;
