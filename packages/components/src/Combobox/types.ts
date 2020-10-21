import React from 'react';

interface Props {
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
  /** Show a loading icon */
  loading?: boolean;
  /** Autocomplete items */
  items?: Array<string>;
}

type HtmlAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Props>;

export interface ComboboxProps extends Props, HtmlAttributes {}

export interface VoiceProps {
  children?: React.Component | ((props: { onClick: () => void; active: boolean }) => React.ReactElement);
  onVoiceInput?: (result: string) => void;
}
