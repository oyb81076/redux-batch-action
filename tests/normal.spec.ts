import { createSimpleStore, incr } from "./createStore";

test("normal", () => {
  const store = createSimpleStore();
  const result: number[] = [];
  store.subscribe(() => {
    result.push(store.getState().count);
  });
  expect(store.getState().count).toBe(0);
  store.dispatch(incr());
  expect(store.getState().count).toBe(1);
  store.dispatch(incr());
  expect(store.getState().count).toBe(2);
  expect(result).toEqual([1, 2]);
});
