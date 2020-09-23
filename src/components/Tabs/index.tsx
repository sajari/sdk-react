import { useId } from '@reach/auto-id';
import React, { useRef, useState } from 'react';

import Box from '../Box';
import TabContextProvider from './context';
import { TabsProps } from './types';

const Tabs = React.forwardRef((props: TabsProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    children,
    onChange,
    index: controlledIndex,
    defaultIndex,
    manual,
    align = 'start',
    fitted,
    alwaysRenderChildren,
    ...rest
  } = props;
  const { current: isControlled } = useRef(controlledIndex != null);
  const selectedPanelRef = useRef<HTMLElement>(null);

  const getInitialIndex = () => {
    if (!manual) {
      return defaultIndex || 0;
    }
    return controlledIndex || defaultIndex || 0;
  };

  const [selectedIndex, setSelectedIndex] = useState(getInitialIndex);

  const getActualIdx = () => {
    if (manual) {
      return selectedIndex;
    }
    return isControlled && typeof controlledIndex === 'number' ? controlledIndex : selectedIndex;
  };

  const [manualIndex, setManualIndex] = useState(controlledIndex || defaultIndex || 0);
  const actualIdx = getActualIdx();
  const manualIdx = isControlled ? controlledIndex : manualIndex;

  const onChangeTab = (index: number) => {
    if (!isControlled) {
      setSelectedIndex(index);
    }

    if (isControlled && manual) {
      setSelectedIndex(index);
    }

    if (!manual) {
      if (onChange) {
        onChange(index);
      }
    }
  };

  const onManualTabChange = (index: number) => {
    if (!isControlled) {
      setManualIndex(index);
    }

    if (manual) {
      if (onChange) {
        onChange(index);
      }
    }
  };

  const onFocusPanel = () => {
    if (selectedPanelRef.current) {
      selectedPanelRef.current.focus();
    }
  };

  const id = useId();

  const context = {
    id,
    index: actualIdx,
    manualIndex: manualIdx,
    onManualTabChange,
    manual,
    onChangeTab,
    selectedPanelRef,
    onFocusPanel,
    align,
    fitted,
    alwaysRenderChildren,
  };

  return (
    <TabContextProvider value={context}>
      <Box ref={ref} {...rest}>
        {children}
      </Box>
    </TabContextProvider>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
export type { TabsProps };

export { default as Tab } from './Tab';
export { default as TabList } from './TabList';
export { default as TabPanel } from './TabPanel';
export { default as TabPanels } from './TabPanels';

export type { TabProps } from './Tab';
export type { TabListProps } from './TabList';
export type { TabPanelProps } from './TabPanel';
export type { TabPanelsProps } from './TabPanels';
