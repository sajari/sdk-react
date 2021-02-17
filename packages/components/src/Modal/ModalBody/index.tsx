import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../../Box';
import { useModalContext } from '../context';
import useModalBodyStyles from './styles';
import { ModalBodyProps } from './types';

const ModalBody = React.forwardRef((props: ModalBodyProps, ref?: React.Ref<HTMLDivElement>) => {
  const { styles: stylesProp, ...rest } = props;
  const { disableDefaultStyles = false, bodyId } = useModalContext();
  const styles = getStylesObject(useModalBodyStyles(props), disableDefaultStyles);

  return <Box ref={ref} id={bodyId} css={[styles.container, stylesProp]} {...rest} />;
});

if (__DEV__) {
  ModalBody.displayName = 'ModalBody';
}

export default ModalBody;
export type { ModalBodyProps };
