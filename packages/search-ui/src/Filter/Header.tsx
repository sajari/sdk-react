/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Button, Heading } from '@sajari/react-components';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { HeaderProps } from './types';

const Header = ({ title, onReset, showReset }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <Box css={tw`flex items-center justify-between mb-2 leading-none`}>
      <Heading as="h2" size="xs" css={tw`leading-snug`}>
        {title}
      </Heading>

      {showReset ? (
        <Button appearance="link" size="xs" spacing="none" onClick={onReset} css={tw`uppercase`}>
          {t('filter.reset')}
        </Button>
      ) : null}
    </Box>
  );
};

export default Header;
