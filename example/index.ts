import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { batchedSubscribe } from "redux-batched-subscribe";
import thunk from "redux-thunk";
import { batch, batchNotifier } from "../src/redux-batch-action";
function reducer(state = 0, action: { type: "incr" }) {
  switch (action.type) {
    case "incr": return state + 1;
    default: return state;
  }
}
const store = createStore(
  combineReducers({ count: reducer }),
  compose(
    applyMiddleware(thunk),
    batchedSubscribe(batchNotifier),
  ),
);

export function incr() {
  return { type: "incr" };
}
store.subscribe(() => {
  console.log("subscribe: %i", store.getState().count);
});
console.log("start");
store.dispatch(incr());
batch(() => {
  store.dispatch(incr());
  store.dispatch(incr());
  store.dispatch(incr());
});
store.dispatch(incr());
console.log("finished");
// console ===>
// start
// subscribe: 1
// subscribe: 4
// subscribe: 5
// finished
