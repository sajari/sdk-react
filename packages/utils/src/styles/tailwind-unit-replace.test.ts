import { processTheme, toEM } from './tailwind-unit-replace';

describe('processTheme ', () => {
  test.each([
    // same shape
    [
      { theme: { extend: { spacing: { '(screen-8)': 'calc(100vh - 2rem)' } } } },
      { theme: { extend: { spacing: { '(screen-8)': 'calc(100vh - 2em)' } } } },
    ],
    // only convert values
    [
      { rem: '1px', em: 'calc(100vh - 2rem)' },
      { rem: '1px', em: 'calc(100vh - 2em)' },
    ],
    // deeply nested
    [
      {
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
        },
      },
      {
        fontSize: {
          xs: ['0.75em', { lineHeight: '1em' }],
          sm: ['0.875em', { lineHeight: '1.25em' }],
        },
      },
    ],
    // array
    [
      {
        outline: {
          none: ['2px solid transparent', '2px'],
          white: ['2rem dotted white', '2rem'],
          black: ['2rem dotted black', '2rem'],
        },
      },
      {
        outline: {
          none: ['2px solid transparent', '2px'],
          white: ['2em dotted white', '2em'],
          black: ['2em dotted black', '2em'],
        },
      },
    ],
  ])('should convert values from rem -> em', (provided: any, expected: any) => {
    expect(processTheme(provided, { exclude: [], replacer: toEM })).toEqual(expected);
  });

  it('should ignore provided `exclude` key', () => {
    const configs = [
      {
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
        },
        spacing: { '(screen-8)': 'calc(100vh - 2rem)' },
      },
      {
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
        },
        spacing: { '(screen-8)': 'calc(100vh - 2em)' },
      },
    ];
    const [from, to] = configs;
    expect(processTheme(from, { exclude: ['fontSize'], replacer: toEM })).toEqual(to);
  });
});
