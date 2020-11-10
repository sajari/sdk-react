/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button, Heading } from '@sajari/react-components';
import tw from 'twin.macro';

import { HeaderProps } from './types';

const Header = ({ title, onReset, showReset }: HeaderProps) => {
  return (
    <div css={tw`flex items-center mb-2 justify-between leading-none`}>
      <Heading as="h2" size="xs">
        {title}
      </Heading>

      {showReset ? (
        <Button appearance="link" size="xs" spacing="none" onClick={onReset}>
          RESET
        </Button>
      ) : null}
    </div>
  );
};

export default Header;
