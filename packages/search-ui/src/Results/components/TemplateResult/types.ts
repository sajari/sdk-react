/* eslint-disable import/no-cycle */
import { PropsWithAs } from '@sajari/react-sdk-utils';

import { ResultValues, Template } from '../../types';
import { ResultProps } from '../Result';

interface Props extends Pick<ResultProps, 'appearance'> {
  template: Template;
  values: ResultValues;
}

export type TemplateResultProps = PropsWithAs<Props, 'div'>;
