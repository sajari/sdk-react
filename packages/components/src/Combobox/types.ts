import React from 'react';

export type ComboboxMode = 'standard' | 'typeahead' | 'suggestions' | 'results';

interface Props {
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
  items?: Array<string>;
  /** Called when the value changes  */
  onChange?: (value?: string) => void;
  /** The typeahead completion value */
  completion?: string;
}

type HtmlAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Props>;

export interface ComboboxProps extends Props, HtmlAttributes {}
