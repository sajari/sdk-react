/** @jsx jsx */
import { jsx } from '@emotion/core';
import { PoweredBy } from '@sajari/react-components';
import tw from 'twin.macro';

import { DownKey, EnterKey, UpKey } from '../../../assets/icons';
import Box from '../../../Box';
import Text from '../../../Text';
import { useComboboxContext } from '../../context';
import DropdownItem from '../DropdownItem';
import { useDropdownStyles } from './styles';

const Dropdown = () => {
  const { mode, open, items, inputValue, highlightedIndex, getMenuProps } = useComboboxContext();
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

          return <DropdownItem value={value} highlight={highlight} selected={selected} index={index} />;
        })}
      </ul>

      {/* TODO: This should be optional */}
      <Box as="footer" css={styles.footer}>
        <Box as="span" css={styles.footerItems}>
          <Box as="span" css={styles.footerItem}>
            <UpKey css={styles.footerIcon} />
            <DownKey css={styles.footerIcon} />
            to navigate
          </Box>

          <Box as="span" css={styles.footerItem}>
            <EnterKey css={styles.footerIcon} />
            to select
          </Box>

          <Box as="span" css={styles.footerItem}>
            <Box as="span" css={tw`mr-1 font-medium`}>
              esc
            </Box>
            to dismiss
          </Box>
        </Box>

        {/* TODO: This should also be optional */}
        <PoweredBy />
      </Box>
    </Box>
  );
};

export default Dropdown;
