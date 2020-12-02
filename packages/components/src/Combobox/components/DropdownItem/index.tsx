/** @jsx jsx */
import { jsx } from '@emotion/core';
import { getStylesObject } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import React from 'react';

import { IconEnterKey } from '../../../assets/icons';
import Box from '../../../Box';
import { useComboboxContext } from '../../context';
import { useDropdownItemStyles } from './styles';
import { DropdownItemProps } from './types';

const DropdownItem = (props: DropdownItemProps) => {
  const { value, index, selected, highlight, ...rest } = props;
  const {
    typedInputValue,
    getItemProps,
    showDropdownTips,
    itemToString,
    onSelect,
    disableDefaultStyles = false,
    customClassNames: {
      dropdownItemClassName = '',
      dropdownSelectedItemClassName = '',
      dropdownHighlightItemClassName = '',
    },
  } = useComboboxContext();
  const stringItem = itemToString(value);
  const styles = getStylesObject(useDropdownItemStyles(props), disableDefaultStyles);

  // Highlight the suggested text rather than their input
  // https://baymard.com/blog/autocomplete-design#7-highlight-the-active-suggestion-desktop-specific
  const renderContent = () => {
    if (typedInputValue && stringItem.startsWith(typedInputValue)) {
      return (
        <React.Fragment>
          {typedInputValue}
          <Box as="span" css={styles.highlight}>
            {stringItem.replace(typedInputValue, '')}
          </Box>
        </React.Fragment>
      );
    }

    return stringItem;
  };

  return (
    <Box
      as="li"
      {...getItemProps({
        index,
        item: value,
        onClick: () => {
          if (onSelect) {
            onSelect(value);
          }
        },
      })}
      key={`${stringItem}_${index}`}
      css={styles.item}
      className={classnames(dropdownItemClassName, {
        [dropdownSelectedItemClassName]: selected,
        [dropdownHighlightItemClassName]: highlight,
      })}
      {...rest}
    >
      <Box as="span">{renderContent()}</Box>

      {showDropdownTips && (
        <Box as="span" css={styles.label}>
          Select
          <IconEnterKey css={styles.iconEnter} />
        </Box>
      )}
    </Box>
  );
};

export default DropdownItem;
