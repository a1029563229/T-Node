import {
  UPDATE_USER_AGE,
  UPDATE_USER_NAME,
  ADD_PRODUCT,
  REVERSE_PRODUCT
} from './actions';

export const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    default: return { ...state };
    case UPDATE_USER_NAME:
      return {
        ...state,
        username: action.payload
      }
    case UPDATE_USER_AGE:
      return {
        ...state,
        age: action.payload
      }
  }
}

export const productReducer = (state = [], action) => {
  switch (action.type) {
    default: return [ ...state ];
    case ADD_PRODUCT:
      return [
        ...state,
        action.payload
      ]
    case REVERSE_PRODUCT:
      const newState = [ ...state ];
      newState.reverse();
      return newState;
  }
}
