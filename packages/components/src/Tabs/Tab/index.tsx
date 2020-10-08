/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { __DEV__ } from '../../utils/assersion';
import Box from '../../Box';
import useTabStyles from './styles';
import { TabProps } from './types';

const Tab = React.forwardRef((props: TabProps, ref?: React.Ref<HTMLButtonElement>) => {
  const { selected, disabled, id, ...rest } = props;
  const styles = useTabStyles(props);

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
      css={styles}
      {...rest}
    />
  );
});

if (__DEV__) {
  Tab.displayName = 'Tab';
}

export default Tab;
export type { TabProps };
