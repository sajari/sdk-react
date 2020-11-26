/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import tw from 'twin.macro';

import { IconDownKey, IconEnterKey, IconUpKey } from '../../../assets/icons';
import Box from '../../../Box';
import Link from '../../../Link';
import PoweredBy from '../../../PoweredBy';
import Text from '../../../Text';
import { useComboboxContext } from '../../context';
import { ResultItem } from '../../types';
import DropdownItem from '../DropdownItem';
import DropdownResult from '../DropdownResult';
import { useDropdownStyles } from './styles';

const Dropdown = () => {
  const {
    mode,
    open,
    items = [],
    inputValue,
    highlightedIndex,
    getMenuProps,
    showDropdownTips,
    showPoweredBy,
    renderItem,
    itemToString,
    getItemProps,
  } = useComboboxContext();
  const shown = (mode === 'results' || mode === 'suggestions') && open && items.length > 0;
  const styles = useDropdownStyles({ shown });
  const label = mode === 'results' ? 'Results' : 'Suggestions';
  let listRender: React.ReactNode = null;

  if (renderItem) {
    listRender = items.map((item, index) => {
      const selected = highlightedIndex === index;
      const stringItem = itemToString(item);
      const highlight = inputValue.length > 0 && stringItem.startsWith(inputValue);

      return (
        <React.Fragment key={`${stringItem}-${index}`}>
          {renderItem({ item, highlight, selected, getItemProps, index })}
        </React.Fragment>
      );
    });
  } else if (mode === 'results') {
    listRender = (items as ResultItem[]).map((item, index) => {
      const selected = highlightedIndex === index;

      return <DropdownResult value={item} selected={selected} index={index} key={`${item.title}-${index}`} />;
    });
  } else {
    listRender = (items as string[]).map((item, index) => {
      const selected = highlightedIndex === index;
      const stringItem = itemToString(item);
      const highlight = inputValue.length > 0 && stringItem.startsWith(inputValue);

      return (
        <DropdownItem
          value={item}
          highlight={highlight}
          selected={selected}
          index={index}
          key={`${stringItem}-${index}`}
        />
      );
    });
  }

  return (
    <Box css={styles.container}>
      <Text as="h6" css={styles.heading}>
        {label}
      </Text>

      <ul {...getMenuProps()} css={styles.items}>
        {listRender}
      </ul>

      {(showDropdownTips || showPoweredBy) && (
        <Box as="footer" css={styles.footer}>
          {showDropdownTips && (
            <Box as="span" css={styles.footerItems}>
              <Box as="span" css={styles.footerItem}>
                <IconUpKey css={styles.footerIcon} />
                <IconDownKey css={styles.footerIcon} />
                to navigate
              </Box>

              <Box as="span" css={styles.footerItem}>
                <IconEnterKey css={styles.footerIcon} />
                to select
              </Box>

              <Box as="span" css={styles.footerItem}>
                <Box as="span" css={tw`mr-1 font-medium`}>
                  esc
                </Box>
                to dismiss
              </Box>
            </Box>
          )}

          {showPoweredBy && <PoweredBy css={tw`ml-auto`} />}
        </Box>
      )}
    </Box>
  );
};

export default Dropdown;
