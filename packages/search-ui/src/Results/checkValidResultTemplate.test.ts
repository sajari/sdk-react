import { checkValidResultTemplate } from './checkValidResultTemplate';

test.each([
  [null, false],
  [undefined, false],
  [{}, false],
  [{ html: '' }, false],
  [{ html: '<p>title goes here</p>' }, true],
])('checkValidResultTemplate(%o)', (input, output) => {
  expect(checkValidResultTemplate(input)).toBe(output);
});
