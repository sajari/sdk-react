/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mergeProps, useId } from '@react-aria/utils';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import { useCombobox } from 'downshift';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import tw from 'twin.macro';

import { IconSearch, IconSmallSearch, IconSpinner } from '../assets/icons';
import Box from '../Box';
import { useVoiceInput } from '../hooks';
import Dropdown from './components/Dropdown';
import Typeahead from './components/Typeahead';
import Voice from './components/Voice';
import ComboboxContextProvider from './context';
import { useComboboxStyles } from './styles';
import { ComboboxProps, ResultItem } from './types';

const Combobox = React.forwardRef(function ComboboxInner<T>(props: ComboboxProps<T>, ref: React.Ref<HTMLInputElement>) {
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
    size = 'md',
    showDropdownTips = false,
    showPoweredBy = true,
    itemToString = mode === 'results'
      ? (item: T) => ((item as unknown) as ResultItem).title
      : (item: T) => (item as unknown) as string,
    itemToUrl = (item: T) => ((item as unknown) as ResultItem).url as string,
    renderItem,
    onSelect,
    disableDefaultStyles = false,
    className,
    styles: stylesProp,
    inputClassName,
    inputContainerClassName,
    ...rest
  } = props;
  const [typedInputValue, setTypedInputValue] = useState(valueProp.toString());
  const { supported: voiceSupported } = useVoiceInput();
  const [value, setValue] = useState(valueProp.toString());

  useEffect(() => {
    setValue(valueProp.toString());
  }, [valueProp]);

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
    setInputValue,
    closeMenu,
  } = useCombobox<T>({
    items,
    itemToString,
    inputValue: value,
    onInputValueChange: (changes) => {
      setValue(changes.inputValue ?? '');
    },
    stateReducer: (state, { changes, type }) => {
      if (mode === 'suggestions') {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownArrowDown:
            if (state.highlightedIndex === (items || []).length - 1) {
              return {
                ...changes,
                inputValue: typedInputValue,
                highlightedIndex: undefined,
              };
            }

            if (changes.highlightedIndex !== undefined) {
              const item = (items || [])[changes.highlightedIndex];
              const stringItem = itemToString(item);

              if (typeof stringItem !== 'string') {
                return changes;
              }

              return {
                ...changes,
                inputValue: stringItem,
                selectedItem: item,
              };
            }

            return changes;

          case useCombobox.stateChangeTypes.InputKeyDownArrowUp:
            if (state.highlightedIndex === 0) {
              return {
                ...changes,
                inputValue: typedInputValue,
                highlightedIndex: undefined,
              };
            }

            if (changes.highlightedIndex !== undefined) {
              const item = (items || [])[changes.highlightedIndex];
              const stringItem = itemToString(item);

              if (typeof stringItem !== 'string') {
                return changes;
              }

              return {
                ...changes,
                inputValue: stringItem,
                selectedItem: item,
              };
            }

            return changes;

          case useCombobox.stateChangeTypes.ItemMouseMove:
            if (changes.highlightedIndex !== undefined) {
              const item = (items || [])[changes.highlightedIndex];
              const stringItem = itemToString(item);

              if (typeof stringItem !== 'string') {
                return changes;
              }

              return {
                ...changes,
                inputValue: stringItem,
                selectedItem: item,
              };
            }
            return changes;

          case useCombobox.stateChangeTypes.InputKeyDownEscape:
            if (state.isOpen) {
              return {
                ...changes,
                isOpen: true,
                inputValue: typedInputValue,
              };
            }
            return changes;

          case useCombobox.stateChangeTypes.InputKeyDownEnter:
            return {
              ...changes,
              isOpen: false,
            };

          default:
            return changes;
        }
      }

      if (mode === 'results') {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
            return {
              ...changes,
              inputValue: '',
            };

          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              inputValue: '',
            };

          case useCombobox.stateChangeTypes.InputChange:
            if (changes.inputValue === '') {
              return {
                ...changes,
                isOpen: false,
              };
            }
            return changes;

          default:
            return changes;
        }
      }

      return changes;
    },
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
    showDropdownTips,
    showPoweredBy,
    typedInputValue,
    renderItem,
    onSelect,
    itemToString,
    itemToUrl,
    disableDefaultStyles,
    customClassNames: rest,
  };

  const handleVoiceInput = (input: string) => {
    if (captureVoiceInput) {
      setInputValue(input);
      setTypedInputValue(input);
    }
    onVoiceInput(input);
  };

  const { styles: comboboxStyles, focusProps } = useComboboxStyles({
    size,
    voiceEnabled: enableVoice && voiceSupported,
    loading,
  });

  const styles = getStylesObject(comboboxStyles, disableDefaultStyles);

  return (
    <ComboboxContextProvider value={context}>
      <Box css={[styles.container, stylesProp]} className={className}>
        <Box css={styles.inputContainer} {...getComboboxProps()}>
          <Box as="label" css={tw`sr-only`} {...getLabelProps({ htmlFor: id })}>
            {label ?? placeholder}
          </Box>

          <Box css={styles.iconContainerLeft} className={inputContainerClassName}>
            {size === 'sm' ? <IconSmallSearch /> : <IconSearch />}
          </Box>

          <Typeahead />

          <Box
            ref={ref}
            as="input"
            css={styles.input}
            {...mergeProps(
              getInputProps({
                id,
                className: inputClassName,
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

                    if (mode === 'suggestions') {
                      closeMenu();
                    }
                  }

                  if (mode !== 'results' && e.key === 'Enter' && highlightedIndex > -1) {
                    setTypedInputValue(itemToString(items[highlightedIndex]));
                  }

                  if (mode === 'typeahead' && e.key === 'ArrowRight') {
                    // @ts-ignore: selectionStart is a member of event.target
                    if (e.target.selectionStart === inputValue.length) {
                      if (completion.startsWith(inputValue)) {
                        setInputValue(completion);
                        setTypedInputValue(completion);
                      }
                    }
                  }

                  if (e.key === 'Enter' && highlightedIndex > -1) {
                    const item = (items || [])[highlightedIndex];
                    if (mode === 'results' && itemToUrl && !renderItem) {
                      const url = itemToUrl(item);
                      if (url) {
                        window.location.href = url;
                      }
                    }
                    if (onSelect) {
                      onSelect(item);
                    }
                  }

                  onKeyDown(e);
                },
                onInput: (e: ChangeEvent<HTMLInputElement>) => {
                  onChange(e.target.value);
                  setTypedInputValue(e.target.value);
                },
              }),
              focusProps,
            )}
            enterKeyHint={enterKeyHint}
            {...rest}
          />

          {enableVoice || loading ? (
            <Box css={styles.iconContainerRight}>
              {loading && <IconSpinner css={styles.iconSpinner} />}
              {enableVoice && <Voice onVoiceInput={handleVoiceInput} />}
            </Box>
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
