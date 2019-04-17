import { batch } from "../src/redux-batch-action";
import { createSimpleStore, incr } from "./createStore";

test("batch", () => {
  const store = createSimpleStore();
  const result: number[] = [];
  store.subscribe(() => {
    result.push(store.getState().count);
  });
  expect(store.getState().count).toBe(0);
  store.dispatch(incr());
  expect(store.getState().count).toBe(1);
  expect(result).toEqual([1]);
  batch(() => {
    store.dispatch(incr());
    expect(store.getState().count).toBe(2);
    store.dispatch(incr());
    expect(store.getState().count).toBe(3);
    expect(result).toEqual([1]);
  });
  expect(store.getState().count).toBe(3);
  expect(result).toEqual([1, 3]);
  store.dispatch(incr());
  expect(store.getState().count).toBe(4);
  expect(result).toEqual([1, 3, 4]);
});

test("batch in batch", () => {
  const store = createSimpleStore();
  const result: number[] = [];
  store.subscribe(() => {
    result.push(store.getState().count);
  });
  expect(store.getState().count).toBe(0);
  batch(() => {
    store.dispatch(incr());
    expect(store.getState().count).toBe(1);
    expect(result).toEqual([]);
    batch(() => {
      store.dispatch(incr());
      expect(store.getState().count).toBe(2);
      expect(result).toEqual([]);
    });
    expect(result).toEqual([]);
  });
  expect(result).toEqual([2]);
});
