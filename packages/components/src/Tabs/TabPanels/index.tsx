import { __DEV__, cleanChildren } from '@sajari/react-sdk-utils';
import React, { cloneElement } from 'react';

import Box from '../../Box';
import { useTabContext } from '../context';
import { TabPanelsProps } from './types';

const TabPanels = React.forwardRef((props: TabPanelsProps, ref?: React.Ref<HTMLDivElement>) => {
  const { children, styles: stylesProp, ...rest } = props;
  const { index: selectedIndex, selectedPanelRef, id, manual, manualIndex } = useTabContext();
  const validChildren = cleanChildren(children);

  const clones = validChildren.map((child, index) =>
    cloneElement(child, {
      selected: manual ? index === manualIndex : index === selectedIndex,
      selectedPanelRef,
      id: `${id}-${index}`,
    }),
  );

  return (
    <Box tabIndex={-1} ref={ref} css={stylesProp} {...rest}>
      {clones}
    </Box>
  );
});

if (__DEV__) {
  TabPanels.displayName = 'TabPanels';
}

export default TabPanels;
export type { TabPanelsProps };
