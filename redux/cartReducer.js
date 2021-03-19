import * as ActionTypes from './ActionTypes';
import { products } from './productsReducer';

function removeItem(array, id) {
    const index = array.indexOf(id)
    if (index > -1) {
        array.splice(index, 1)
    }
    return array
}
const CartReducer = (state = {products:[], dishes:[], total: 0}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PRODUCT_TO_CART:
            return {...state, products: state.products.concat(action.payload)};
        case ActionTypes.REMOVE_PRODUCT_FROM_CART:
            return {...state, products: removeItem(state.products, action.payload.productId), total: state.total - action.payload.price};
        case ActionTypes.REMOVE_ALL_PRODUCTS_FROM_CART: 
            return {...state, products: [], total: 0};
        case ActionTypes.ADD_PRODUCT_COST_TO_TOTAL:
            return {...state, total: state.total + action.payload}  
        default:
            return state
    }
}
export { CartReducer as default };