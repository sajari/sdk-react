import { mergeProps } from '@react-aria/utils';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import React from 'react';

import Box from '../../Box';
import { useTabContext } from '../context';
import useTabStyles from './styles';
import { TabProps } from './types';

const Tab = React.forwardRef((props: TabProps, ref?: React.Ref<HTMLButtonElement>) => {
  const { selected, disabled, id, className, selectedClassName = '', ...rest } = props;
  const { disableDefaultStyles = false } = useTabContext();
  const { styles: containerStyles, focusRingProps } = useTabStyles(props);
  const styles = getStylesObject({ container: containerStyles }, disableDefaultStyles);

  return (
    <Box
      ref={ref}
      role="tab"
      as="button"
      type="button"
      tabIndex={selected ? 0 : -1}
      id={`tab-${id}`}
      disabled={disabled}
      aria-selected={selected}
      aria-disabled={disabled}
      aria-controls={`panel-${id}`}
      className={classnames(className, { [selectedClassName]: selected })}
      css={styles.container}
      {...mergeProps(rest, focusRingProps)}
    />
  );
});

if (__DEV__) {
  Tab.displayName = 'Tab';
}

export default Tab;
export type { TabProps };
