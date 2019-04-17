import { batch } from "../src/redux-batch-action";
import { createThunkStore, incr } from "./createStore";

test("thunk", () => {
  const store = createThunkStore();
  const result: number[] = [];
  store.subscribe(() => {
    result.push(store.getState().count);
  });
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
    });
    expect(result).toEqual([1, 2, 5]);
    store.dispatch(incr());
    expect(store.getState().count).toBe(6);
    expect(result).toEqual([1, 2, 5, 6]);
  }) as any);
  expect(result).toEqual([1, 2, 5, 6]);
  store.dispatch(incr());
  expect(store.getState().count).toBe(7);
  expect(result).toEqual([1, 2, 5, 6, 7]);
});
