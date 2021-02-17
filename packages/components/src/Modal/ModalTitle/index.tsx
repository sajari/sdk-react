import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

import Text from '../../Text';
import { useModalContext } from '../context';
import useModalTitleStyles from './styles';
import { ModalTitleProps } from './types';

const ModalTitle = React.forwardRef((props: ModalTitleProps, ref?: React.Ref<HTMLParagraphElement>) => {
  const { styles: stylesProp, ...rest } = props;
  const { disableDefaultStyles = false, titleId } = useModalContext();
  const styles = getStylesObject(useModalTitleStyles(), disableDefaultStyles);

  return <Text ref={ref} id={titleId} truncate css={[styles.container, stylesProp]} {...rest} />;
});

if (__DEV__) {
  ModalTitle.displayName = 'ModalTitle';
}

export default ModalTitle;
export type { ModalTitleProps };
