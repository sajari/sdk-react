declare namespace jest {
  interface AsymmetricMatcher {
    $$typeof: Symbol;
    sample?: string | RegExp | object | Array<any> | Function;
  }
  // throws an error because the non native version has it also defined, so just comment it
  // type Value = string | number | RegExp | AsymmetricMatcher | undefined

  interface Options {
    media?: string;
    modifier?: string;
    supports?: string;
  }

  interface Matchers<R> {
    toHaveStyleRule(property: string, value?: string | number, options?: Options): R;
  }
}
