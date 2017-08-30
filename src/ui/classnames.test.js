import classnames from "./classnames";

test("basic usage", () => {
  const className = classnames({ foo: true, bar: false });

  expect(className).toContain("foo");
  expect(className).not.toContain("bar");
});
