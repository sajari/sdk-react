import { TextProps } from '@sajari/react-components';

export interface SummaryProps extends Omit<TextProps, 'children'> {
  /** Show/hide the override text */
  showOverride?: boolean;
}
