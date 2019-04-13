import { applyMiddleware, combineReducers, compose, createStore as _createStore } from "redux";
import { batchedSubscribe } from "redux-batched-subscribe";
import thunk from "redux-thunk";
import { batchNotifier } from "../src/redux-batch-action";
function reducer(state = 0, action: { type: "incr" }) {
  switch (action.type) {
    case "incr": return state + 1;
    default: return state;
  }
}
export function createStore(useThunk: boolean) {
  return _createStore(
    combineReducers({ count: reducer }),
    compose(
      applyMiddleware(...useThunk ? [thunk] : []),
      batchedSubscribe(batchNotifier),
    ),
  );
}

export function incr() {
  return { type: "incr" };
}
