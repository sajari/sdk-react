/* eslint-disable no-nested-ternary */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { useFocusWithin } from '@react-aria/interactions';
import { useCombobox } from 'downshift';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

import { Search, Spinner } from '../assets/icons';
import Box from '../Box';
import useInputStyles from '../hooks/useInputStyles';
import { __DEV__ } from '../utils/assertion';
import Dropdown from './components/Dropdown';
import Typeahead from './components/Typeahead';
import Voice from './components/Voice';
import ComboboxContextProvider from './context';
import { ComboboxProps } from './types';

const StyledIconContainer = styled.div<{
  left?: boolean;
  showCancel?: boolean;
}>`
  ${tw`text-gray-400`}
  ${({ left = false, showCancel = false }) =>
    left
      ? tw`absolute inset-y-0 left-0 flex items-center pl-3`
      : showCancel
      ? tw`absolute inset-y-0 right-0 flex items-center pr-8`
      : tw`absolute inset-y-0 right-0 flex items-center pr-4`}
`;

const Combobox = React.forwardRef((props: ComboboxProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    mode = 'standard',
    label,
    placeholder,
    enterKeyHint = 'search',
    id = `combobox-${useId()}`,
    invalid,
    onChange = () => {},
    onKeyDown = () => {},
    onVoiceInput = () => {},
    enableVoice = false,
    loading = false,
    value = '',
    items = [],
    completion = '',
    ...rest
  } = props;
  const [showCancel, setShowCancel] = useState(!value);

  const {
    isOpen: open,
    getLabelProps,
    getMenuProps,
    getItemProps,
    getInputProps,
    getComboboxProps,
    selectedItem,
    highlightedIndex,
    inputValue,
  } = useCombobox({
    items,
    initialInputValue: value.toString(),
    onInputValueChange: (changes) => onChange(changes.inputValue),
    onSelectedItemChange: (changes) => onChange(changes.inputValue),
  });

  useEffect(() => setShowCancel(value ? value !== '' : false), [value]);

  const [focusWithin, setFocusWithin] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (isFocusWithin) => setFocusWithin(isFocusWithin),
  });

  const context = {
    mode,
    inputValue,
    open,
    items,
    completion,
    selectedItem,
    highlightedIndex,
    getMenuProps,
    getItemProps,
  };

  const styles = useInputStyles({ block: true, type: 'combobox' });

  return (
    <ComboboxContextProvider value={context}>
      <Box css={tw`relative`} {...focusWithinProps}>
        <Box
          css={[tw`relative form-input`, styles, focusWithin ? tw`border-blue-400 shadow-outline-blue` : tw``]}
          {...getComboboxProps()}
        >
          <Box as="label" css={tw`sr-only`} {...getLabelProps({ htmlFor: id })}>
            {label ?? placeholder}
          </Box>

          <StyledIconContainer left>
            <Search />
          </StyledIconContainer>

          <Typeahead />

          <Box
            ref={ref}
            as="input"
            css={[tw`form-input`, tw`absolute inset-0 w-full bg-transparent border-0 pl-9`]}
            {...getInputProps({
              type: 'search',
              dir: 'auto',
              placeholder,
              'aria-invalid': invalid,
              autoCapitalize: 'off',
              autoComplete: 'off',
              autoCorrect: 'off',
              spellCheck: 'false',
              inputMode: 'search',
              onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
                // Don't supress native form submission when 'Enter' key is pressed
                // Only if the user isn't focused on an item in the suggestions
                if (e.key === 'Enter' && highlightedIndex === -1) {
                  (e.nativeEvent as any).preventDownshiftDefault = true;
                }

                onKeyDown(e);
              },
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);

                if (!value) {
                  setShowCancel(e.target.value !== '');
                }
              },
            })}
            enterkeyhint={enterKeyHint}
            {...rest}
          />

          {enableVoice || loading ? (
            <StyledIconContainer showCancel={showCancel}>
              {enableVoice && <Voice onVoiceInput={onVoiceInput} />}
              {loading && <Spinner />}
            </StyledIconContainer>
          ) : null}
        </Box>

        <Dropdown />
      </Box>
    </ComboboxContextProvider>
  );
});

if (__DEV__) {
  Combobox.displayName = 'Combobox';
}

export default Combobox;
export type { ComboboxProps };
