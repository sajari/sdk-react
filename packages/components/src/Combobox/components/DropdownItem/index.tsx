/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import tw from 'twin.macro';

import { IconEnterKey } from '../../../assets/icons';
import Box from '../../../Box';
import { useComboboxContext } from '../../context';
import { useDropdownItemStyles } from './styles';
import { DropdownItemProps } from './types';

const DropdownItem = (props: DropdownItemProps) => {
  const { highlight, value, index, selected } = props;
  const { inputValue, getItemProps, showDropdownTips } = useComboboxContext();
  const styles = useDropdownItemStyles(props);

  // Highlight the suggested text rather than their input
  // https://baymard.com/blog/autocomplete-design#7-highlight-the-active-suggestion-desktop-specific
  const renderContent = () => {
    if (highlight) {
      return (
        <React.Fragment>
          {inputValue}
          <Box as="span" css={styles.highlight}>
            {value.replace(inputValue, '')}
          </Box>
        </React.Fragment>
      );
    }

    return value;
  };

  return (
    <Box
      as="li"
      {...getItemProps({
        index,
        item: value,
      })}
      key={`${value}_${index}`}
      css={styles.item}
    >
      <Box as="span">{renderContent()}</Box>

      {showDropdownTips && (
        <Box as="span" css={[styles.label, selected ? tw`opacity-100` : tw`opacity-0`]}>
          Select
          <IconEnterKey css={tw`ml-2`} />
        </Box>
      )}
    </Box>
  );
};

export default DropdownItem;
