import * as TYPES from '../../ActionType.js';
/**
 * 这里可以初始化一个默认的实体类
 */
const initialState = {

}
/**
 * 在这里可以拿到action并return给IndexReducers.js进行分发。
 * 
 * 根据type判断了是从哪个action过来的数据，并进行选择性return。
 */
export default function getDays(state = initialState, action) {
    switch (action.type) {
        case TYPES.DAY_ADD_SUCCESS: // 添加成功
            return { message:'success' };
            break;
        case TYPES.DAY_ADD_FAIL: //添加失败
            return { message:'fail' };
            break;
        case TYPES.DAY_DELETE_SUCCESS: //删除成功
            return { message:'success' };
            break;
        case TYPES.DAY_DELETE_FAIL: //删除失败
            return { message:'fail' };
            break;
        case TYPES.SWIPER_INDEX: //
            return { message:'success',swiper_index:action.index,isPast:action.isPast};
            break;
        default:
            return { message:'show' };
    }
}