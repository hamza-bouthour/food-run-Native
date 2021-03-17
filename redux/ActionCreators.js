import * as ActionTypes from './ActionTypes';
import { POPULARS } from '../shared/populars';
import { PRODUCTS } from '../shared/products'
import { products } from './productsReducer';

// POPULAR DISHES ACTIONS
export const fetchPopulars = () => dispatch => {
    dispatch(popularsLoading())
    setTimeout(() => {
        dispatch(addPopulars(POPULARS))
    }, 1000);
}
export const popularsLoading = () => ({
    type: ActionTypes.POPULARS_LOADING
});

export const popularsFailed = errMess => ({
    type: ActionTypes.POPULARS_FAILED,
    payload: errMess
});

export const addPopulars = populars => ({
    type: ActionTypes.ADD_POPULARS,
    payload: populars
});

// PRODUCTS ACTIONS
export const fetchProducts = () => dispatch => {
    dispatch(productsLoading())
    setTimeout(() => {
        dispatch(addProducts(PRODUCTS))
    }, 1000);
}
export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = errMess => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errMess
});

export const addProducts = products => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

// CART ACTIONS

export const addProductToCart = productId => ({
    type:ActionTypes.ADD_PRODUCT_TO_CART,
    payload: 
        products.push(productId)
    
})
export const removeProductFromCart = productId => ({
    type: ActionTypes.REMOVE_PRODUCT_FROM_CART,
    payload: 
        delete products[productId]
    
})
export const removeAllProductsFromCart = () => ({
    type: ActionTypes.REMOVE_ALL_PRODUCTS_FROM_CART 
})