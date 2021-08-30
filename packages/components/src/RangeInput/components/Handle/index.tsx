import { getStylesObject } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import * as React from 'react';

import Box from '../../../Box';
import useHandleStyles from './styles';
import { HandleProps } from './types';

const Handle = React.forwardRef((props: HandleProps, ref?: React.Ref<HTMLButtonElement>) => {
  const { active, styles: stylesProp, disableDefaultStyles = false, className, activeClassName = '', ...rest } = props;
  const { focusProps, styles: fillStyles } = useHandleStyles(props);
  const styles = getStylesObject(fillStyles, disableDefaultStyles);

  return (
    <Box
      as="button"
      type="button"
      css={[styles.container, stylesProp]}
      ref={ref}
      {...focusProps}
      className={classnames(className, { [activeClassName]: active })}
      {...rest}
    />
  );
});

export default Handle;
