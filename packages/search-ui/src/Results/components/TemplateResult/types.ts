/* eslint-disable import/no-cycle */
import { PropsWithAs } from '@sajari/react-sdk-utils';

import { ResultValues } from '../../types';

interface Props {
  values: ResultValues;
  render: (v: ResultValues) => string;
}

export type TemplateResultProps = PropsWithAs<Props, 'div'>;
