import { replaceAll } from '../string';

test.each([
  ['', ',', ' ', ''],
  ['rEplacEAll', 'E', 'e', 'replaceAll'],
  [
    'background-color: red; padding: 10px 20px;',
    ';',
    ' !important;',
    'background-color: red !important; padding: 10px 20px !important;',
  ],
  [
    '@keyframes fadeIn{from{opacity:0 !important;}{to{opacity:0 !important;}}}',
    ' !important',
    '',
    '@keyframes fadeIn{from{opacity:0;}{to{opacity:0;}}}',
  ],
])('replaceAll(%s, %s, %s)', (target, search, replacement, expected) => {
  expect(replaceAll(target, search, replacement)).toEqual(expected);
});
