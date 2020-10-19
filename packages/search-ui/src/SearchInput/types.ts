import { TextInputProps } from '@sajari/react-components';
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
}

type HtmlAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Props>;

export interface SearchInputProps extends TextInputProps {}

export interface VoiceProps {
  children?: React.Component | ((props: { onClick: () => void; active: boolean }) => React.ReactElement);
  onVoiceInput?: (result: string) => void;
}
