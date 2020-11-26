/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRefWithAs, PropsWithAs } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../Box';
import useTextStyles from './styles';
import { TextProps } from './types';

type DefaultElement = 'p';

const TextComponent = (props: PropsWithAs<TextProps, DefaultElement>, ref: React.Ref<HTMLParagraphElement>) => {
  const { as = 'p', size, truncate, ...rest } = props;
  const styles = useTextStyles({ as, size, truncate });

  return <Box ref={ref} as={as} css={styles} {...rest} />;
};

const Text = forwardRefWithAs<TextProps, DefaultElement>(TextComponent);

export default Text;
export type { TextProps };
