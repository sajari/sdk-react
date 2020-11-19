import { HTMLAttributes } from 'react';

type Props = {
  /** Show/hide the override text */
  showOverride?: boolean;
};

export type SummaryProps = Props & HTMLAttributes<HTMLElement>;
