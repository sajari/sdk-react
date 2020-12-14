import { FieldDictionary } from '@sajari/react-hooks';
import { Result } from '@sajari/sdk-js';

const fillTemplate = <T = Record<string, string | string[]>>(template: string, variables: T) =>
  template.replace(/\${(.*?)}/g, (_, g: string) => variables[g].toString());

export function mapFields<T = Record<string, string | string[] | null>>(values: T, fields: FieldDictionary = {}) {
  return Object.entries(fields).reduce(
    (mapped, [to, from]) => {
      let value: string | null;
      if (from === false) {
        value = null;
      } else if (Array.isArray(from)) {
        const match = from.find((f) => Object.keys(values).includes(f)) as string;
        value = values[match];
      } else if (typeof from === 'function') {
        value = from(values);
      } else if (/\${.+}/.test(from)) {
        value = fillTemplate<T>(from, values);
      } else if (from.startsWith('!function')) {
        const functionBody = from.replace('!function', '');
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
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
