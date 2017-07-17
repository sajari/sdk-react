import { Filter, singleFilter } from "./filter";

test("Test empty filter", () => {
  const f = new Filter(singleFilter);
  expect(f.evaluate()).toBe(undefined);
});
