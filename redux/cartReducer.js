import * as ActionTypes from './ActionTypes';


function removeItem(array, id) {
    const index = array.indexOf(id)
    if (index > -1) {
        array.splice(index, 1)
    }
    return array
}
export const cart = (state = {products:[], dishes:[], total: 0}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PRODUCT_TO_CART:
            return {...state, products: state.products.concat(action.payload)};
        case ActionTypes.REMOVE_PRODUCT_FROM_CART:
            return {...state, products: removeItem(state.products, action.payload.productId), total: Math.round(state.total - action.payload.price)};
        case ActionTypes.REMOVE_ALL_PRODUCTS_FROM_CART: 
            return {...state, products: [], total: 0.00};
        case ActionTypes.ADD_PRODUCT_COST_TO_TOTAL:
            return {...state, total: Math.round(state.total + action.payload)}  
        default:
            return state
    }
}
