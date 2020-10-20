import { Result } from '@sajari/sdk-js';

import { Fields } from '../SearchContextProvider/types';

export function mapFields<T = Record<string, string | string[]>>(values: T, fields: Fields = {}) {
  const mappingFields = { ...values };

  Object.entries(fields).forEach(([key, mapKey]) => {
    const value = values[mapKey];
    if (value) {
      mappingFields[key] = value;
      delete mappingFields[mapKey];
    }
  });

  return mappingFields as Record<keyof Fields, string | string[]> & T;
}

export default function mapResultFields<T = Record<string, string | string[]>>(results: Result[], fields: Fields) {
  return results.map(({ values, ...rest }) => ({
    ...rest,
    // @ts-ignore
    values: mapFields<T>(values, fields),
  }));
}
