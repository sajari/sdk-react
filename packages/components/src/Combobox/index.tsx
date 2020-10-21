/* eslint-disable no-nested-ternary */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { useCombobox } from 'downshift';
import React, { ChangeEvent } from 'react';
import tw, { styled } from 'twin.macro';

import { Search, Spinner } from '../assets/icons';
import Box from '../Box';
import useInputStyles from '../hooks/useInputStyles';
import { __DEV__ } from '../utils/assertion';
import Menu from './components/Menu';
import InputContextProvider from './context';
import { ComboboxProps } from './types';
import { Voice } from './Voice';

const StyledIconContainer = styled.div<{
  left?: boolean;
  showCancel?: boolean;
}>`
  ${tw`text-gray-400`}
  ${({ left = false, showCancel = false }) =>
    left
      ? tw`absolute inset-y-0 left-0 flex items-center pl-4`
      : showCancel
      ? tw`absolute inset-y-0 right-0 flex items-center pr-8`
      : tw`absolute inset-y-0 right-0 flex items-center pr-4`}
`;

const Combobox = React.forwardRef((props: ComboboxProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    label,
    placeholder,
    enterKeyHint = 'search',
    id = `combobox-${useId()}`,
    invalid,
    onChange = () => {},
    onVoiceInput = () => {},
    enableVoice = false,
    loading = false,
    value = '',
    items = [],
    ...rest
  } = props;
  const [showCancel, setShowCancel] = React.useState(!value);
  const hasItems = items?.length > 0;

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
    // onInputValueChange: ({ inputValue }) => onChange(inputValue),
    // onSelectedItemChange: ({ inputValue }) => onChange(inputValue, true),
  });

  React.useEffect(() => setShowCancel(value ? value !== '' : false), [value]);

  const context = {
    inputValue,
    open,
    items,
    selectedItem,
    highlightedIndex,
    getItemProps,
  };

  const styles = useInputStyles({ block: true, type: 'combobox' });

  return (
    <InputContextProvider value={context}>
      <Box css={[tw`relative`]}>
        <Box as="label" css={tw`sr-only`} htmlFor={id} {...getLabelProps()}>
          {label ?? placeholder}
        </Box>

        <Box css={tw`relative`} {...getComboboxProps()}>
          <StyledIconContainer left>
            <Search />
          </StyledIconContainer>

          {/** @ts-ignore enterkeyhint */}
          <Box
            ref={ref}
            as="input"
            type="search"
            dir="auto"
            css={[tw`form-input`, styles, open && hasItems ? tw`rounded-b-none` : tw``]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChange(e);
              if (!value) {
                setShowCancel(e.target.value !== '');
              }
            }}
            placeholder={placeholder}
            enterkeyhint={enterKeyHint}
            aria-invalid={invalid}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            inputMode="search"
            {...rest}
            {...getInputProps()}
          />

          {enableVoice || loading ? (
            <StyledIconContainer showCancel={showCancel}>
              {enableVoice && <Voice onVoiceInput={onVoiceInput} />}
              {loading && <Spinner />}
            </StyledIconContainer>
          ) : null}
        </Box>

        <Menu {...getMenuProps({ refKey: 'innerRef' })} />
      </Box>
    </InputContextProvider>
  );
});

if (__DEV__) {
  Combobox.displayName = 'Combobox';
}

export default Combobox;
export type { ComboboxProps };
