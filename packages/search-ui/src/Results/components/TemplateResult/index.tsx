import { Box } from '@sajari/react-components';
import { useSearchUIContext } from '@sajari/react-search-ui';
import React from 'react';

import { TemplateResultProps } from './types';

const TemplateResult = (props: TemplateResultProps) => {
  const { customClassNames } = useSearchUIContext();
  const { render, values, as } = props;
  const rendered = render(values);

  return (
    <Box
      as={as}
      className={customClassNames.results?.template?.resultContainer}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};

export default TemplateResult;
