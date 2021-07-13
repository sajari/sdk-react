import { checkValidTemplate } from './index';

test.each([
  [null, false],
  [undefined, false],
  [{}, false],
  [{ html: '' }, false],
  [{ html: '<p>title goes here</p>' }, true],
])('checkValidTemplate(%o)', (input, output) => {
  expect(checkValidTemplate(input)).toBe(output);
});
