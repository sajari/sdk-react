/* eslint-disable prefer-arrow-callback */

import { mergeProps, useId } from '@react-aria/utils';
import { __DEV__, getStylesObject, isEmpty, isFunction, isSSR, mergeRefs } from '@sajari/react-sdk-utils';
import { useCombobox } from 'downshift';
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
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

const Combobox = React.forwardRef(function ComboboxInner<T>(
  props: ComboboxProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    mode = 'standard',
    label,
    placeholder = 'Search',
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
    inputElement,
    portalContainer = isSSR() ? null : document.body,
    autoFocus = false,
    variant = 'outline',
    ...rest
  } = props;
  const [typedInputValue, setTypedInputValue] = useState(valueProp.toString());
  const { supported: voiceSupported } = useVoiceInput();
  const [value, setValue] = useState(valueProp.toString());
  const inputRef = useRef<HTMLInputElement>(null);
  const inAttachMode = Boolean(inputElement?.current);

  useEffect(() => {
    if (autoFocus) {
      inputRef?.current?.focus();
    }
  }, [autoFocus]);

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
    openMenu,
  } = useCombobox<T>({
    items,
    itemToString,
    inputValue: value,
    onInputValueChange: (changes) => {
      setValue(changes.inputValue ?? '');
    },
    onSelectedItemChange: (changes) => {
      if (typeof changes.selectedItem === 'string') {
        setValue(changes.selectedItem);
      }
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
    inAttachMode,
    inputElement,
    size,
  };

  const handleVoiceInput = (input: string) => {
    if (captureVoiceInput) {
      setInputValue(input);
      setTypedInputValue(input);
      if (mode === 'results') {
        openMenu();
      }
    }
    onVoiceInput(input);
  };

  const { styles: comboboxStyles, focusProps } = useComboboxStyles({
    size,
    voiceEnabled: enableVoice && voiceSupported,
    loading,
    variant,
  });

  const styles = getStylesObject(comboboxStyles, disableDefaultStyles);

  const inputProps = getInputProps({
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
    ref: mergeRefs(ref, inputRef),
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      // Don't supress native form submission when 'Enter' key is pressed
      // Only if the user isn't focused on an item in the suggestions
      if (e.key === 'Enter' && highlightedIndex === -1) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (e.nativeEvent) {
          (e.nativeEvent as any).preventDownshiftDefault = true;
        }

        if (mode === 'suggestions') {
          closeMenu();
        }
      }

      if (mode !== 'results' && e.key === 'Enter' && highlightedIndex > -1) {
        setTypedInputValue(itemToString(items[highlightedIndex]));
      }

      if (mode === 'typeahead' && ['ArrowRight', 'Tab'].includes(e.key)) {
        if ((e.target as HTMLInputElement).selectionStart === inputValue.length) {
          // only enable completion if user has typed something
          if (!isEmpty(inputValue) && completion.startsWith(inputValue)) {
            if (e.key === 'Tab' && inputValue.toLowerCase() !== completion.toLowerCase()) {
              // to keep focus inside the input
              e.preventDefault();
            }
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

          const result = (item as unknown) as ResultItem;
          if (isFunction(result.onClick)) {
            result.onClick();
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
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
  });

  const renderInAttachMode = useCallback(() => {
    if (isSSR()) {
      return null;
    }
    return ReactDOM.createPortal(<Dropdown />, portalContainer ?? document.body);
  }, []);

  useEffect(() => {
    if (inputElement?.current) {
      inputElement.current.value = inputValue;
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputElement?.current) {
      inputElement.current.setAttribute('autocomplete', 'off');
      inputElement.current.setAttribute('autocapitalize', 'off');
      inputElement.current.setAttribute('autocorrect', 'off');
      inputElement.current.setAttribute('spellcheck', 'false');

      inputElement.current.addEventListener('keydown', inputProps.onKeyDown);
      inputElement.current.addEventListener('input', inputProps.onChange);
    }
    return () => {
      inputElement?.current?.removeEventListener('keydown', inputProps.onKeyDown);
      inputElement?.current?.removeEventListener('input', inputProps.onChange);
    };
  }, [inputElement, inputProps.onKeyDown, inputProps.onChange]);

  return (
    <ComboboxContextProvider value={context}>
      {inputElement ? (
        renderInAttachMode()
      ) : (
        <Box css={[styles.container, stylesProp]} className={className}>
          <Box css={styles.inputContainer} {...getComboboxProps()}>
            <Box as="label" css={tw`sr-only`} {...getLabelProps({ htmlFor: id })}>
              {label ?? placeholder}
            </Box>

            <Box css={styles.iconContainerLeft} className={inputContainerClassName}>
              {size === 'sm' ? <IconSmallSearch /> : <IconSearch css={styles.iconSearch} />}
            </Box>

            <Typeahead />

            <Box
              data-testid="combobox-input"
              as="input"
              css={styles.input}
              {...mergeProps(inputProps, focusProps)}
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
      )}
    </ComboboxContextProvider>
  );
});

if (__DEV__) {
  Combobox.displayName = 'Combobox';
}

export default Combobox;
export type { ComboboxProps };
