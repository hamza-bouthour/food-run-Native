import * as ActionTypes from './ActionTypes';

export const cart = (state = {products:[], dishes:[], total: null}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PRODUCT_TO_CART:
            return {...state, products: action.payload};
        case ActionTypes.REMOVE_PRODUCT_FROM_CART:
            return {...state, products: action.payload};
        case ActionTypes.REMOVE_ALL_PRODUCTS_FROM_CART: 
            return {...state, products: []};
        default:
            return state
    }
}