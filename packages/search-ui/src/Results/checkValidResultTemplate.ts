import { isEmpty, isEmptyObject, isNullOrUndefined } from '@sajari/react-sdk-utils';

import { ResultTemplate } from './types';

export function checkValidResultTemplate(
  template?: Omit<ResultTemplate, 'css'> | null | Record<string, never>,
): template is ResultTemplate {
  return !isNullOrUndefined(template) && !isEmptyObject(template) && !isEmpty(template?.html);
}
