import React, { cloneElement } from 'react';

import { __DEV__ } from '../../utils/assersion';
import { cleanChildren } from '../../utils/react-helpers';
import Box from '../../Box';
import { useTabContext } from '../context';
import { TabPanelsProps } from './types';

const TabPanels = React.forwardRef((props: TabPanelsProps, ref?: React.Ref<HTMLDivElement>) => {
  const { children, ...rest } = props;
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
    <Box tabIndex={-1} ref={ref} {...rest}>
      {clones}
    </Box>
  );
});

if (__DEV__) {
  TabPanels.displayName = 'TabPanels';
}

export default TabPanels;
export type { TabPanelsProps };
