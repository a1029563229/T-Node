export const logger = ({ getState, dispatch }) => next => action => {
  console.log(action.type);
  return next(action);
}

export const recorder = ({ getState, dispatch }) => next => action => {
  console.log(action.payload);
  return next(action);
}