/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { cloneElement, useRef } from 'react';

import { __DEV__ } from '../../utils/assersion';
import { cleanChildren } from '../../utils/react-helpers';
import Box from '../../Box';
import { useTabContext } from '../context';
import useTabListStyles from './styles';
import { TabListProps } from './types';

const TabList = React.forwardRef((props: TabListProps, ref?: React.Ref<HTMLDivElement>) => {
  const { children, onKeyDown, onClick, ...rest } = props;
  const styles = useTabListStyles();
  const {
    id,
    index: selectedIndex,
    manualIndex,
    onManualTabChange,
    manual,
    onChangeTab,
    onFocusPanel,
  } = useTabContext();
  const allNodes = useRef<HTMLElement[]>([]);
  const validChildren = cleanChildren(children);

  const focusableIndexes = validChildren
    .map((child, index) => (child.props.disabled === true ? null : index))
    .filter((index) => index != null) as number[];

  const enabledSelectedIndex = focusableIndexes.indexOf(selectedIndex);
  const count = focusableIndexes.length;

  const updateIndex = (index: number) => {
    const childIndex = focusableIndexes[index];

    allNodes.current[childIndex].focus();

    if (onChangeTab) {
      onChangeTab(childIndex);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (enabledSelectedIndex + 1) % count;
      updateIndex(nextIndex);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = (enabledSelectedIndex - 1 + count) % count;
      updateIndex(nextIndex);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      updateIndex(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      updateIndex(count - 1);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (onFocusPanel) {
        onFocusPanel();
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const clones = validChildren.map((child, index) => {
    const selected = manual ? index === manualIndex : index === selectedIndex;

    const handleClick = (event: React.MouseEvent) => {
      // Hack for Safari. Buttons don't receive focus on click on Safari
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
      allNodes.current[index].focus();

      onManualTabChange(index);
      onChangeTab(index);

      if (child.props.onClick) {
        child.props.onClick(event);
      }
    };

    return cloneElement(child, {
      ref: (node: HTMLElement) => {
        allNodes.current[index] = node;
        return node;
      },
      selected,
      onClick: handleClick,
      id: `${id}-${index}`,
    });
  });

  return (
    <Box ref={ref} role="tablist" onKeyDown={handleKeyDown} css={styles} {...rest}>
      {clones}
    </Box>
  );
});

if (__DEV__) {
  TabList.displayName = 'TabList';
}

export default TabList;
export type { TabListProps };
