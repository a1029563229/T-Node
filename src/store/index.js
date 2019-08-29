import { createStore, combineReducers, applyMiddleWare } from '@/packages/tredux';
import { userInfoReducer, productReducer } from './reducers';
import {
  logger,
  recorder
} from './middleWare';
import thunk from 'redux-thunk';

const middleWare = applyMiddleWare(thunk, logger, recorder);

const reducers = combineReducers({
  user: userInfoReducer, 
  product: productReducer
});

const store = createStore(reducers, middleWare);

export default store;