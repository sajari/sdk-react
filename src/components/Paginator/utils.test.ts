import { pageNumbers } from "./utils";

test.each([
  [1, 10, 5, [1, 2, 3, 4, 5]],
  [3, 10, 3, [2, 3, 4]],
  [5, 10, 5, [3, 4, 5, 6, 7]],
  [2, 10, 7, [1, 2, 3, 4, 5, 6, 7]],
  [5, 6, 3, [4, 5, 6]],
  [9, 10, 5, [6, 7, 8, 9, 10]]
])("pageNumber(%d, %d, %d): %j", (page, totalPages, windowSize, expected) => {
  expect(pageNumbers(page, totalPages, windowSize)).toEqual(expected);
});
