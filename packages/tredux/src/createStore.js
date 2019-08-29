import { T_REDUX_INIT } from './actions';

const createStore = (reducer, enhancer) => {
  const listeners = [];
  let currentState;

  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  const subscribe = listener => {
    listeners.push(listener);
  }

  const dispatch = action => {
    currentState = reducer(currentState, action);

    for(let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  const getState = () => {
    return currentState;
  }

  dispatch({ type: T_REDUX_INIT });

  return {
    subscribe,
    dispatch,
    getState
  }
}

export default createStore;