import { TextProps } from '@sajari/react-components';

export interface SummaryProps extends Omit<TextProps, 'children'> {
  /** Show the query override text */
  showOverride?: boolean;
  /** Show the search latency  */
  showLatency?: boolean;
}
