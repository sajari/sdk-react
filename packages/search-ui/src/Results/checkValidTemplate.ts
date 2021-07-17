import { isEmpty, isEmptyObject, isNullOrUndefined } from '@sajari/react-sdk-utils';

import { Template } from './types';

export function checkValidTemplate(
  template?: Omit<Template, 'css'> | null | Record<string, never>,
): template is Template {
  return !isNullOrUndefined(template) && !isEmptyObject(template) && !isEmpty(template?.html);
}
