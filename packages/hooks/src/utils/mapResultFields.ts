import { Result } from '@sajari/sdk-js';

import { Fields } from '../SearchContextProvider';

export function mapFields<T = Record<string, string | string[]>>(values: T, fields: Fields = {}) {
  const mappingFields = { ...values };

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(fields)) {
    const value = values[fields[key]];
    if (value) {
      mappingFields[key] = value;
      delete mappingFields[fields[key]];
    }
  }

  return mappingFields as Record<keyof Fields, string | string[]> & T;
}

export default function mapResultFields<T = Record<string, string | string[]>>(results: Result[], fields: Fields) {
  return results.map(({ values, ...rest }) => ({
    ...rest,
    // @ts-ignore
    values: mapFields<T>(values, fields),
  }));
}
