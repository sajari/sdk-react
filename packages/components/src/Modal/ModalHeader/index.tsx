import React from 'react';

import { ModalHeaderProps } from './types';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import Box from '../../Box';
import { useModalContext } from '../context';
import useModalHeaderStyles from './styles';

const ModalHeader = React.forwardRef((props: ModalHeaderProps, ref?: React.Ref<HTMLElement>) => {
  const { styles: stylesProp, ...rest } = props;
  const { disableDefaultStyles = false } = useModalContext();
  const styles = getStylesObject(useModalHeaderStyles(), disableDefaultStyles);

  return <Box ref={ref} as="header" css={[styles.container, stylesProp]} {...rest} />;
});

if (__DEV__) {
  ModalHeader.displayName = 'ModalHeader';
}

export default ModalHeader;
export type { ModalHeaderProps };
