import { Box } from '@sajari/react-components';
import { useSearchUIContext } from '@sajari/react-search-ui';
import Handlebars from 'handlebars';
import React from 'react';

import { TemplateResultProps } from './types';

const TemplateResults = (props: TemplateResultProps) => {
  const { customClassNames } = useSearchUIContext();
  const { template, values, as } = props;
  const handlebarTemplate = Handlebars.compile(template.html);
  const rendered = handlebarTemplate(values);
  // eslint-disable-next-line react/no-danger
  return (
    <Box
      as={as}
      className={customClassNames.results?.template?.resultContainer}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};

export default TemplateResults;
