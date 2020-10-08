import React from 'react';

export interface TabsProps {
  children: React.ReactNode;
  /** Callback when the index (controlled or un-controlled) changes. */
  onChange?: (index: number) => void;
  /** The index of the activated tab  */
  index?: number;
  /** The index of the tab that should be activated initially */
  defaultIndex?: number;
  /**
   * If `true`, the tabs will be manually activated and
   * display its panel by pressing Space or Enter.
   *
   * If `false`, the tabs will be automatically activated
   * and their panel is displayed when they receive focus.
   */
  manual?: boolean;
  /** The alignment of the tabs */
  align?: 'start' | 'center' | 'end';
  /** If `true`, tabs will stretch to width of the tablist. */
  fitted?: boolean;
  /** If `true`, children in the Tabs will render when hidden */
  alwaysRenderChildren?: boolean;
}

export interface TabsContextOptions extends Omit<TabsProps, 'children' | 'index'> {
  id?: string;
  index: number;
  manualIndex?: number;
  onManualTabChange: (index: number) => void;
  onChangeTab: (index: number) => void;
  selectedPanelRef: React.Ref<HTMLElement>;
  onFocusPanel: () => void;
  alwaysRenderChildren?: boolean;
}
