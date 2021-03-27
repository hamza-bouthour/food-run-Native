import * as ActionTypes from './ActionTypes';


export const favoriteProducts = (state=[], action) => {
    switch(action.type) {
        case ActionTypes.ADD_PRODUCT_TO_FAVORITE:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);
        case ActionTypes.REMOVE_PRODUCT_FROM_FAVORITE:
            return state.filter(s=>s !== action.payload)
        default:
            return state    
    }
}

