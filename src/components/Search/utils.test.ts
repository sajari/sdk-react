import { isNotEmptyString, isNotEmptyArray } from "./utils";

// @ts-ignore: https://facebook.github.io/jest/docs/en/api.html#testeachtable-name-fn
test.each([["", "a", "a"], ["b", "a", "b"], ["b", "", "b"]])(
  "isNotEmptyString(%s, %s)",
  (a, b, expected) => {
    expect(isNotEmptyString(a, b)).toBe(expected);
  }
);

// @ts-ignore: https://facebook.github.io/jest/docs/en/api.html#testeachtable-name-fn
test.each([[[], ["a"], ["a"]], [["b"], ["a"], ["b"]], [["b"], [], ["b"]]])(
  "isNotEmptyArray(%o, %o)",
  (a, b, expected) => {
    expect(isNotEmptyArray(a, b)).toEqual(expected);
  }
);
