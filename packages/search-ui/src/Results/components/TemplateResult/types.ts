/* eslint-disable import/no-cycle */
import { PropsWithAs } from '@sajari/react-sdk-utils';

import { ResultValues, Template } from '../../types';

interface Props {
  template: Template;
  values: ResultValues;
}

export type TemplateResultProps = PropsWithAs<Props, 'div'>;
