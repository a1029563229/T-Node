const combineReducers = reducers => (state = {}, action) => {
  const reducerKeys = Object.keys(reducers);
  const combineState = {};

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    const reducer = reducers[key];
    const originalStateKey = state[key];
    const newStateKey = reducer(originalStateKey, action);
    combineState[key] = newStateKey === originalStateKey ? originalStateKey : newStateKey;
  }
  
  return combineState;
}

export default combineReducers;