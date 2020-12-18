import { Box, Label, Text } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import { useSearchUIContext } from '../ContextProvider';
import useViewOptionStyles from './styles';
import { ViewOptionProps } from './types';

const ViewOption = (props: ViewOptionProps) => {
  const { disableDefaultStyles = false } = useSearchUIContext();
  const {
    id,
    inline = true,
    renderAsLabel: input,
    label,
    size,
    styles: stylesProp,
    children,
    containerClassName,
    labelClassName,
    ...rest
  } = props;
  const labelId = `${id}-label`;
  const { searched } = useSearchContext();
  const styles = getStylesObject(useViewOptionStyles({ inline }), disableDefaultStyles);

  if (!searched) {
    return null;
  }

  const labelProps = {
    id: labelId,
    css: styles.label,
    size,
    disableDefaultStyles,
    className: labelClassName,
  };

  return (
    <Box css={[styles.container, stylesProp]} aria-labelledby={labelId} {...rest} className={containerClassName}>
      {input ? (
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>
      ) : (
        <Text {...labelProps}>{label}</Text>
      )}

      {children}
    </Box>
  );
};

export default ViewOption;
export type { ViewOptionProps };
