import { Result } from '@sajari/sdk-js';

import { FieldDictionary } from '../SearchContextProvider/types';

const fillTemplate = <T = Record<string, string | string[]>>(template: string, variables: T) =>
  template.replace(/\${(.*?)}/g, (_, g: string) => variables[g].toString());

export function mapFields<T = Record<string, string | string[]>>(values: T, fields: FieldDictionary = {}) {
  return Object.entries(fields).reduce(
    (mapped, [to, from]) => {
      let value;
      if (Array.isArray(from)) {
        const match = from.find((f) => {
          return Object.keys(values).includes(f);
        }) as string;
        value = values[match];
      } else if (typeof from === 'function') {
        value = from(values);
      } else if (from.startsWith('`') && from.endsWith('`')) {
        const template = from.substring(1, from.length - 1);
        value = fillTemplate<T>(template, values);
      } else if (from.startsWith('!function')) {
        const functionBody = from.replace('!function', '');
        const func = new Function('data', functionBody);
        value = func(values);
      } else {
        value = values[from];
      }

      return {
        ...mapped,
        [to]: value,
      };
    },
    { ...values },
  );
}

export default function mapResultFields<T = Record<string, string | string[]>>(
  results: Result[],
  fields: FieldDictionary,
) {
  return results.map(({ values, ...rest }) => ({
    ...rest,
    // @ts-ignore
    values: mapFields<T>(values, fields),
  }));
}
