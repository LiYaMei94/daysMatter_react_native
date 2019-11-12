import * as TYPES from '../ActionType';

const increase_success=function (){
    return {type:TYPES.DAY_ADD_SUCCESS};
}
const increase_fail=function (){
    return {type:TYPES.DAY_ADD_FAIL};
}
const delete_success=function(){
    return {type:TYPES.DAY_DELETE_SUCCESS};
}
const delete_fail=function(){
    return {type:TYPES.DAY_DELETE_FAIL};
}
function swiper_index(swiper_index,isPast){
    return {type:TYPES.SWIPER_INDEX,index:swiper_index,isPast:isPast};
}
//const swiper_index=function(){
   // return {type:TYPES.SWIPER_INDEX};
//}
export {
    increase_success,
    increase_fail,
    delete_success,
    delete_fail,
    swiper_index
}