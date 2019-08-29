const compose = fns => {
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}

const applyMiddleWares = (...middleWares) => createStore => (...args) => {
  const store = createStore(...args);

  const middleWareSet = middleWares.map(middleWare => middleWare(store));
  const dispatch = compose(middleWareSet)(store.dispatch);
  
  return {
    ...store,
    dispatch
  }
}

export default applyMiddleWares;