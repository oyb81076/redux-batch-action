import { createStore, incr } from "./createStore";
import { batch } from "../src/redux-batch-action";

test("normal", () => {
  const store = createStore(false);
  const result: number[] = []
  store.subscribe(() => {
    result.push(store.getState().count)
  })
  expect(store.getState().count).toBe(0);
  store.dispatch(incr());
  expect(store.getState().count).toBe(1);
  store.dispatch(incr());
  expect(store.getState().count).toBe(2);
  expect(result).toEqual([1, 2]);
});
test("batch", () => {
  const store = createStore(false);
  const result: number[] = []
  store.subscribe(() => {
    result.push(store.getState().count)
  })
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
  })
  expect(store.getState().count).toBe(3);
  expect(result).toEqual([1, 3]);
  store.dispatch(incr());
  expect(store.getState().count).toBe(4);
  expect(result).toEqual([1, 3, 4]);
})
test("thunk", () => {
  const store = createStore(true);
  const result: number[] = []
  store.subscribe(() => {
    result.push(store.getState().count)
  })
  expect(store.getState().count).toBe(0);
  store.dispatch(incr());
  expect(store.getState().count).toBe(1);
  expect(result).toEqual([1]);
  store.dispatch(((dispatch: typeof store["dispatch"], getState: typeof store["getState"]) => {
    dispatch(incr());
    expect(getState().count).toBe(2);
    expect(result).toEqual([1, 2]);
    batch(() => {
      dispatch(incr());
      expect(getState().count).toBe(3);
      dispatch(incr());
      expect(getState().count).toBe(4);
      dispatch(incr());
      expect(getState().count).toBe(5);
      expect(result).toEqual([1, 2]);
    })
    expect(result).toEqual([1, 2, 5]);
    store.dispatch(incr());
    expect(store.getState().count).toBe(6);
    expect(result).toEqual([1, 2, 5, 6]);
  }) as any)
  expect(result).toEqual([1, 2, 5, 6]);
  store.dispatch(incr());
  expect(store.getState().count).toBe(7);
  expect(result).toEqual([1, 2, 5, 6, 7]);
});

test("batch in batch", ()=> {
  const store = createStore(true);
  const result: number[] = []
  store.subscribe(() => {
    result.push(store.getState().count)
  })
  expect(store.getState().count).toBe(0);
  batch(()=> {
    store.dispatch(incr())
    expect(store.getState().count).toBe(1);
    expect(result).toEqual([]);
    batch(()=> {
      store.dispatch(incr())
      expect(store.getState().count).toBe(2);
      expect(result).toEqual([]);
    });
    expect(result).toEqual([]);
  })
  expect(result).toEqual([2]);
})