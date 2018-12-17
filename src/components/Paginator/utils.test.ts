import { pageNumbers } from "./utils";

test.each([
  [1, 10, 5, [1, 2, 3, 4, 5]],
  [3, 10, 3, [2, 3, 4]],
  [5, 10, 5, [3, 4, 5, 6, 7]],
  [2, 10, 7, [1, 2, 3, 4, 5, 6, 7]]
])("pageNumber()", (page, totalPages, windowSize, expected) => {
  expect(pageNumbers(page, totalPages, windowSize)).toEqual(expected);
});
