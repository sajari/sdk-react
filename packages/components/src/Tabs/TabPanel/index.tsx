import React from 'react';
import Box from '../../Box';

import { __DEV__ } from '../../utils/assersion';
import { assignRef } from '../../utils/react-helpers';
import { useTabContext } from '../context';
import { TabPanelProps } from './types';

const TabPanel = React.forwardRef((props: TabPanelProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, selected, selectedPanelRef, id, ...rest } = props;
  const { alwaysRenderChildren } = useTabContext();

  return (
    <Box
      ref={(node: HTMLDivElement) => {
        if (selected && selectedPanelRef) {
          assignRef(selectedPanelRef, node);
        }
        assignRef(ref, node);
      }}
      role="tabpanel"
      tabIndex={-1}
      aria-labelledby={`tab:${id}`}
      hidden={!selected}
      id={`panel:${id}`}
      {...rest}
    >
      {(alwaysRenderChildren || selected) && children}
    </Box>
  );
});

if (__DEV__) {
  TabPanel.displayName = 'TabPanel';
}

export default TabPanel;
export type { TabPanelProps };
