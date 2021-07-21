import { clamp, roundToStep } from '../number';

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

test.each([
  [0, 100, 0.5, 1, 50],
  [0, 100, 0.05, 1, 5],
  [300, 700, 0.3, 1, 420],
  [400, 450, 0.9, 1, 445],
])('min: %d, max: %d, percent: %d, step: %d', (min, max, percent, step, output) => {
  expect(roundToStep((max - min) * percent + min, step)).toBe(output);
});
