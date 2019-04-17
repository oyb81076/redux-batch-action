import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { batchedSubscribe } from "redux-batched-subscribe";
import thunk from "redux-thunk";
import { batchNotifier } from "../src/redux-batch-action";
function reducer(state = 0, action: { type: "incr" }) {
  switch (action.type) {
    case "incr": return state + 1;
    default: return state;
  }
}
export function createSimpleStore() {
  return createStore(
    combineReducers({ count: reducer }),
    batchedSubscribe(batchNotifier),
  );
}
export function createThunkStore() {
  return createStore(
    combineReducers({ count: reducer }),
    compose(
      applyMiddleware(thunk),
      batchedSubscribe(batchNotifier),
    ),
  );
}

export function incr() {
  return { type: "incr" };
}
