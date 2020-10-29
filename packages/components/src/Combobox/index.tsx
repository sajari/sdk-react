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
import ComboboxContextProvider from './context';
import { ComboboxProps } from './types';
import { Voice } from './Voice';

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
    onInputValueChange: (changes) => onChange(changes.inputValue),
    onSelectedItemChange: (changes) => onChange(changes.inputValue),
  });

  React.useEffect(() => setShowCancel(value ? value !== '' : false), [value]);

  const context = {
    inputValue,
    open,
    items,
    selectedItem,
    highlightedIndex,
    getMenuProps,
    getItemProps,
  };

  const styles = useInputStyles({ block: true, type: 'combobox' });

  return (
    <ComboboxContextProvider value={context}>
      <Box css={[tw`relative`]}>
        <Box as="label" css={tw`sr-only`} {...getLabelProps({ htmlFor: id })}>
          {label ?? placeholder}
        </Box>

        <Box css={tw`relative`} {...getComboboxProps()}>
          <StyledIconContainer left>
            <Search />
          </StyledIconContainer>

          <Box
            ref={ref}
            as="input"
            css={[tw`form-input`, styles, open && hasItems ? tw`rounded-b-none` : tw``]}
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
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
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

        <Menu />
      </Box>
    </ComboboxContextProvider>
  );
});

if (__DEV__) {
  Combobox.displayName = 'Combobox';
}

export default Combobox;
export type { ComboboxProps };
