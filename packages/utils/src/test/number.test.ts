import { clamp } from '../../../components/src/utils/number';

test.each([
  [0, 100, 101, 100],
  [-50, 200, -49, -49],
  [10, 11, 10.5, 10.5],
  [0, 0, 0, 0],
  [-200, -100, -99, -100],
  [50, 20, 21, 20],
])('min: %d, max: %d, input: %d', (min, max, input, result) => {
  expect(clamp(input, min, max)).toBe(result);
});
