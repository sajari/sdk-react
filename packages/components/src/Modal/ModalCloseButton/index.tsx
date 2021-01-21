import React from 'react';

import { useModalContext } from '../context';
import { ModalCloseButtonProps } from './types';
import Button from '../../Button';
import { callAllHandlers, __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import { IconClose } from '../../assets/icons';
import useModalCloseButtonStyles from './styles';

const ModalCloseButton = React.forwardRef((props: ModalCloseButtonProps, ref?: React.Ref<HTMLElement>) => {
  const { onClose, disableDefaultStyles = false } = useModalContext();
  const { onClick, label = 'Close', styles: stylesProp, ...rest } = props;
  const styles = getStylesObject(useModalCloseButtonStyles(), disableDefaultStyles);

  return (
    <Button
      ref={ref}
      onClick={callAllHandlers(onClick, onClose)}
      aria-label={label}
      disableDefaultStyles={disableDefaultStyles}
      css={[styles.container, stylesProp]}
      {...rest}
    >
      <IconClose />
    </Button>
  );
});

if (__DEV__) {
  ModalCloseButton.displayName = 'ModalCloseButton';
}

export default ModalCloseButton;
export type { ModalCloseButtonProps };
