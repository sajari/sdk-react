import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import React, { Children } from 'react';

import ButtonGroup from '../../ButtonGroup';
import { useModalContext } from '../context';
import { ModalSize } from '../types';
import useModalFooterStyles from './styles';
import { ModalFooterProps } from './types';

const ModalFooter = React.forwardRef((props: ModalFooterProps, ref?: React.Ref<HTMLDivElement>) => {
  const { styles: stylesProp, ...rest } = props;
  const { disableDefaultStyles = false } = useModalContext();
  const styles = getStylesObject(useModalFooterStyles(), disableDefaultStyles);
  const { children } = props;
  const { size = 'md' } = useModalContext();
  const fullWidthSizes: Array<ModalSize> = ['xs', 'sm'];

  if (Children.toArray(children).length === 2) {
    fullWidthSizes.push('md');
  }

  const fullWidth = fullWidthSizes.includes(size);

  return (
    <ButtonGroup
      ref={ref}
      fullwidth={fullWidth}
      css={[styles.container, stylesProp]}
      disableDefaultStyles={disableDefaultStyles}
      {...rest}
    />
  );
});

if (__DEV__) {
  ModalFooter.displayName = 'ModalFooter';
}

export default ModalFooter;
export type { ModalFooterProps };
