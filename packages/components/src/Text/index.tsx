import { forwardRefWithAs, getStylesObject, PropsWithAs } from '@sajari/react-sdk-utils';
import * as React from 'react';

import Box from '../Box';
import useTextStyles from './styles';
import { TextProps } from './types';

type DefaultElement = 'p';

const TextComponent = (props: PropsWithAs<TextProps, DefaultElement>, ref: React.Ref<HTMLParagraphElement>) => {
  const { as = 'p', truncate, disableDefaultStyles = false, size, styles: stylesProp, ...rest } = props;
  const styles = getStylesObject(useTextStyles({ as, truncate, size }), disableDefaultStyles);

  return <Box ref={ref} as={as} css={[styles.container, stylesProp]} {...rest} />;
};

const Text = forwardRefWithAs<TextProps, DefaultElement>(TextComponent);

export default Text;
export type { TextProps };
