/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Button, Heading } from '@sajari/react-components';
import tw from 'twin.macro';

import { HeaderProps } from './types';

const Header = ({ title, onReset, showReset }: HeaderProps) => {
  return (
    <Box css={tw`flex items-center justify-between mb-2 leading-none`}>
      <Heading as="h2" size="xs" css={tw`leading-snug`}>
        {title}
      </Heading>

      {showReset ? (
        <Button appearance="link" size="xs" spacing="none" onClick={onReset}>
          RESET
        </Button>
      ) : null}
    </Box>
  );
};

export default Header;
