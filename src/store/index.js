import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userInfoReducer, productReducer } from './reducers';
import {
  logger,
  recorder
} from './middleWare';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  user: userInfoReducer, 
  product: productReducer
});
const middleWare = applyMiddleware(thunk, logger, recorder);

const store = createStore(reducers, middleWare);

export default store;