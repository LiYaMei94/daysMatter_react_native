/**
 * create by AbyssKitty on 2017/09/22
 * 事件分发 总模块
 */
 
import { combineReducers } from 'redux';
import GetDayReducer from './reducerItem/GetDayReducer.js';
 
//这里面必须要有初始数据 - 否则报错
const rootReducer = combineReducers({
    GetDayReducer,
});
 
export default rootReducer;