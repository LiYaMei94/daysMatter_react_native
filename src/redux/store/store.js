/**
 * store 的配置文件
 */
 
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/IndexReducers.js';
 

 
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
 
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}