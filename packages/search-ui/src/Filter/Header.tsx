import { Box, Button, Heading } from '@sajari/react-components';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { useSearchUIContext } from '../ContextProvider';
import { HeaderProps } from './types';

const Header = ({ title, onReset, showReset }: HeaderProps) => {
  const { t } = useTranslation('filter');
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();

  const styles = getStylesObject(
    {
      container: [tw`flex items-center justify-between mb-2 leading-none`],
      heading: [tw`leading-snug`],
    },
    disableDefaultStyles,
  );

  return (
    <Box css={styles.container} className={customClassNames.filter?.header}>
      <Heading
        as="h2"
        size="xs"
        css={styles.heading}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.filter?.title}
      >
        {title}
      </Heading>

      {showReset ? (
        <Button
          appearance="link"
          size="xs"
          spacing="none"
          onClick={onReset}
          css={tw`uppercase`}
          disableDefaultStyles={disableDefaultStyles}
          className={customClassNames.filter?.resetButton}
        >
          {t('reset')}
        </Button>
      ) : null}
    </Box>
  );
};

export default Header;
