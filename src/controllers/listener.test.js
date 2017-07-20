import Listener from "./listener";

test("Test 1 callback", () => {
  const l = new Listener();
  let callbackRan = false;
  l.listen(() => {
    callbackRan = true;
  });
  l.notify(listener => listener());
  expect(callbackRan).toBe(true);
});
