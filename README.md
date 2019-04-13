# redux-batch-action
## install
yarn install redux-batched-subscribe redux-batch-action
## example
```ts
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { batchedSubscribe } from "redux-batched-subscribe";
import thunk from "redux-thunk";
import { batch, batchNotifier } from "redux-batch-action";
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

```
## store.js
```tsx
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { batchedSubscribe } from "redux-batched-subscribe";
import { batchNotifier } from "redux-batch-action";
import thunk from "redux-thunk"
const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk), // if you need thunk
    batchedSubscribe(batchNotifier)
  ),
)
```
### with react-redux
```tsx
import { batch } from "redux-batch-action"
import { connect } from "react-redux"
connect(null, (dispatch)=> {
  return {
    onChange(){ 
      batch(()=> {
        dispatch(action0());
        dispatch(action1());
        dispatch(action2());
      })
    }
  }
})(MyComponent);
```
### with thunk
```tsx
function someAction(){
  return (dispatch, getStore)=> {
    batch(()=> {
      dispatch(action1());
      if (getStore().xxx ) {
        dispatch(action2());
      } else {
        dispatch(action3());
      }
    })
  }
}
```
### with promise
```tsx
import { transaction } from "redux-batch-action";
function promiseAction(){
  return async (dispatch, getStore)=> {
    const commit = transaction();
    try {
      const user = await fetchUser();
      dispatch(loginIn(user))
    } finally {
      commit();
    }
  }
}
```