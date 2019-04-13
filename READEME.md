# redux-batches
## install
yarn install redux-batched-subscribe redux-batches
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
### with react-redux ```
```tsx
import { batches } from "redux-batches"
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