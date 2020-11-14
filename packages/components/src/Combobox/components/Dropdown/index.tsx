/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import { IconDownKey, IconEnterKey, IconUpKey } from '../../../assets/icons';
import Box from '../../../Box';
import PoweredBy from '../../../PoweredBy';
import Text from '../../../Text';
import { useComboboxContext } from '../../context';
import DropdownItem from '../DropdownItem';
import { useDropdownStyles } from './styles';

const Dropdown = () => {
  const {
    mode,
    open,
    items,
    inputValue,
    highlightedIndex,
    getMenuProps,
    showDropdownTips,
    showPoweredBy,
  } = useComboboxContext();
  const shown = (mode === 'results' || mode === 'suggestions') && open && items.length > 0;
  const styles = useDropdownStyles({ shown });
  const label = mode === 'results' ? 'Results' : 'Suggestions';

  return (
    <Box css={styles.container}>
      <Text as="h6" css={styles.heading}>
        {label}
      </Text>

      <ul {...getMenuProps()} css={styles.items}>
        {items.map((value, index) => {
          const selected = highlightedIndex === index;
          const highlight = inputValue.length > 0 && value.startsWith(inputValue);

          return (
            <DropdownItem
              value={value}
              highlight={highlight}
              selected={selected}
              index={index}
              key={`${value}-${index}`}
            />
          );
        })}
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

          {showPoweredBy && <PoweredBy />}
        </Box>
      )}
    </Box>
  );
};

export default Dropdown;
