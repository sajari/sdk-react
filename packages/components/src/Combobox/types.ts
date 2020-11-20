import { UseComboboxReturnValue } from 'downshift';
import React from 'react';

export type ComboboxMode = 'standard' | 'typeahead' | 'suggestions' | 'results';

export interface ResultItem {
  title: string;
  url?: string;
  description?: string;
  image?: string;
}

interface Props<T> {
  /** The mode for the combobox to operate */
  mode?: ComboboxMode;
  /** The state when entering an invalid input */
  invalid?: boolean;
  /** An aria-label, also used for the placeholder if not specified */
  label?: string;
  /** Hint for virtual keyboards
   * https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-enterkeyhint-attribute */
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  /* OnVoiceInput handler */
  onVoiceInput?: (text: string) => void;
  /** Whether to enable speech recognition API */
  enableVoice?: boolean;
  /** Whether to set the capture the voice input as the input value */
  captureVoiceInput?: boolean;
  /** Show a loading icon */
  loading?: boolean;
  /** Autocomplete items */
  items?: T[];
  /** Called when the value changes  */
  onChange?: (value?: string) => void;
  /** Called when a value is selected  */
  onSelect?: (item: T) => void;
  /** The typeahead completion value */
  completion?: string;
  /** The size of the combobox input */
  size?: 'sm' | 'md';
  /** Whether to show tips in the dropdown on how to navigate the options */
  showDropdownTips?: boolean;
  /** Whether to show the "Powered by Sajari" in the dropdown */
  showPoweredBy?: boolean;
  /** Callback to convert item (object) to string */
  itemToString?: (item: T) => string;
  /** Callback to get/compute url from item object for results mode */
  itemToUrl?: (item: T) => string;
  /** Render prop function for customizing result item view */
  renderItem?: (params: {
    item: T;
    highlight: boolean;
    index: number;
    selected: boolean;
    getItemProps: UseComboboxReturnValue<T>['getItemProps'];
  }) => React.ReactNode;
}

type HtmlAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Props<any>>;

export interface ComboboxProps<T> extends Props<T>, HtmlAttributes {}
