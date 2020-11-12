/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { mergeProps } from '@react-aria/utils';
import { useCombobox } from 'downshift';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

import { Search, Spinner } from '../assets/icons';
import Box from '../Box';
import { __DEV__ } from '../utils/assertion';
import Dropdown from './components/Dropdown';
import Typeahead from './components/Typeahead';
import Voice from './components/Voice';
import ComboboxContextProvider from './context';
import { useComboboxStyles } from './styles';
import { ComboboxProps } from './types';

const StyledIconContainer = styled.div<{
  left?: boolean;
}>`
  ${tw`absolute inset-y-0 flex items-center space-x-2 text-gray-400`}
  ${({ left = false }) => (left ? tw`left-0 pl-3` : tw`right-0 pr-4`)}
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
    captureVoiceInput = true,
    loading = false,
    value: valueProp = '',
    items = [],
    completion = '',
    ...rest
  } = props;
  const [value, setValue] = useState(valueProp);
  useEffect(() => setValue(valueProp), [valueProp]);

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
    inputValue: value.toString(),
    onInputValueChange: (changes) => {
      setValue(changes.inputValue ?? '');
      onChange(changes.inputValue);
    },
    onSelectedItemChange: (changes) => onChange(changes.inputValue),
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

  const handleVoiceInput = (input: string) => {
    if (captureVoiceInput) {
      setValue(input);
    }
    onVoiceInput(input);
  };

  const { styles, focusProps } = useComboboxStyles();

  return (
    <ComboboxContextProvider value={context}>
      <Box css={styles.container}>
        <Box css={styles.inputContainer} {...getComboboxProps()}>
          <Box as="label" css={styles.label} {...getLabelProps({ htmlFor: id })}>
            {label ?? placeholder}
          </Box>

          <StyledIconContainer left>
            <Search />
          </StyledIconContainer>

          <Typeahead />

          <Box
            ref={ref}
            as="input"
            css={styles.input}
            {...mergeProps(
              getInputProps({
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
                onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
              }),
              focusProps,
            )}
            enterKeyHint={enterKeyHint}
            {...rest}
          />

          {enableVoice || loading ? (
            <StyledIconContainer>
              {loading && <Spinner />}
              {enableVoice && <Voice onVoiceInput={handleVoiceInput} />}
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
