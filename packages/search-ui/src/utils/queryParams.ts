import { ResultViewType } from '../ContextProvider/types';

export function isViewType(value: string): value is ResultViewType {
  return ['grid', 'list'].includes(value);
}
