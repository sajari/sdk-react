/* eslint-disable react/no-array-index-key */
import { createPopper, Instance } from '@popperjs/core';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import { IconDownKey, IconEnterKey, IconUpKey } from '../../../assets/icons';
import Box from '../../../Box';
import { useDropdownStyles } from '../../../hooks';
import PoweredBy from '../../../PoweredBy';
import Text from '../../../Text';
import { useComboboxContext } from '../../context';
import { ResultItem } from '../../types';
import DropdownItem from '../DropdownItem';
import DropdownResult from '../DropdownResult';

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
    disableDefaultStyles = false,
    customClassNames: { dropdownClassName, dropdownListClassName, dropdownFooterClassName },
    inAttachMode,
    inputElement,
  } = useComboboxContext();
  const shown = (mode === 'results' || mode === 'suggestions') && open && items.length > 0;
  const styles = getStylesObject(useDropdownStyles({ shown }), disableDefaultStyles);
  const label = mode === 'results' ? 'Results' : 'Suggestions';
  let listRender: React.ReactNode = null;
  const ref = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    let instance: Instance | null = null;
    if (inAttachMode && ref.current && inputElement?.current) {
      const { width, paddingLeft, paddingRight, boxSizing } = getComputedStyle(inputElement.current);
      const finalWidth =
        boxSizing === 'content-box'
          ? parseInt(width, 10) + parseInt(paddingRight, 10) + parseInt(paddingLeft, 10)
          : parseInt(width, 10);
      ref.current.style.width = `${finalWidth}px`;
      // max/capped value for z-index
      ref.current.style.zIndex = '2147483647';
      instance = createPopper(inputElement.current, ref.current, {
        placement: 'bottom-start',
        modifiers: [{ name: 'flip', enabled: false }],
      });
    }
    function reposition() {
      instance?.forceUpdate();
    }
    inputElement?.current?.addEventListener('focus', reposition);
    return () => {
      instance?.destroy();
      inputElement?.current?.removeEventListener('focus', reposition);
    };
  }, [shown, inputElement, ref.current]);

  return (
    <Box ref={ref} css={styles.container} className={dropdownClassName}>
      <Text as="h6" css={styles.heading}>
        {label}
      </Text>

      <ul {...getMenuProps()} css={styles.items} className={dropdownListClassName}>
        {listRender}
      </ul>

      {(showDropdownTips || showPoweredBy) && (
        <Box as="footer" css={styles.footer} className={dropdownFooterClassName}>
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
                <Box as="span" css={styles.footerEscHint}>
                  esc
                </Box>
                to dismiss
              </Box>
            </Box>
          )}

          {showPoweredBy && <PoweredBy css={styles.poweredBy} />}
        </Box>
      )}
    </Box>
  );
};

export default Dropdown;
