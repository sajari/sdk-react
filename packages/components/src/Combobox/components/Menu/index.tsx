/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { styled } from 'sajari-react-sdk-styles';
import tw from 'twin.macro';

import { DownKey, EnterKey, UpKey } from '../../../assets/icons';
import Box from '../../../Box';
import Text from '../../../Text';
import { useComboboxContext } from '../../context';
import Item from '../Item';
import { useItemsStyles } from './styles';

const List = styled.ul``;

const Menu = (props: any) => {
  const { open, items, inputValue, highlightedIndex } = useComboboxContext();
  const styles = useItemsStyles();
  const { innerRef, ...rest } = props;

  if (!open || !items.length) {
    return null;
  }

  return (
    <Box css={styles.container}>
      <Text as="h6" css={styles.heading}>
        Suggestions
      </Text>
      <List {...rest} ref={innerRef} css={styles.items}>
        {items.map((value, index) => {
          const selected = highlightedIndex === index;
          const highlight = inputValue.length > 0 && value.startsWith(inputValue);

          return <Item value={value} highlight={highlight} selected={selected} index={index} />;
        })}
      </List>
      <Box as="footer" css={styles.footer}>
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
    </Box>
  );
};

export default Menu;
