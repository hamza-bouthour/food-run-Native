import * as ActionTypes from './ActionTypes';
import { POPULARS } from '../shared/populars';
import { PRODUCTS } from '../shared/products'
import { products } from './productsReducer';

const popularsUrl = 'http://192.168.253.168:3000/populars'
// POPULAR DISHES ACTIONS
export const fetchPopulars = () => dispatch => {
    dispatch(popularsLoading())
    fetch(popularsUrl, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data => {
                dispatch(addPopulars(data))
        })
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    

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
    
        dispatch(addProducts(PRODUCTS))
    
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

export const addProductToCart = (productId) => ({
    type:ActionTypes.ADD_PRODUCT_TO_CART,
    payload: 
        productId
    
})
export const addProductToTotal = (productPrice) => ({
    type:ActionTypes.ADD_PRODUCT_COST_TO_TOTAL,
    payload: 
        productPrice
    
})
export const removeProductFromCart = (productId, price) => ({
    type: ActionTypes.REMOVE_PRODUCT_FROM_CART,
    payload: 
        {
            productId: productId,
            price: price
        }
    
})
export const removeAllProductsFromCart = () => ({
    type: ActionTypes.REMOVE_ALL_PRODUCTS_FROM_CART 
})

export const markFavorite = (dishPopularId) => ({
    type: ActionTypes.MARK_FAVORITE,
    payload: dishPopularId
})
export const unMarkFavorite = (dishPopularId) => ({
    type: ActionTypes.UNMARK_FAVORITE,
    payload: dishPopularId
})

export const addDishToCart = (dishId) => ({
    type: ActionTypes.ADD_DISH_TO_CART,
    payload: dishId
})

export const addAccount = (userName, email, password, subscribed) => ({
    type: ActionTypes.ADD_ACCOUNT,
    payload: {
        userName,
        email,
        password,
        subscribed
    }
})
export const addProductToFavorite = (productId) => ({
    type: ActionTypes.ADD_PRODUCT_TO_FAVORITE,
    payload: productId
})
export const removeProductFromFavorite = (productId) => ({
    type: ActionTypes.REMOVE_PRODUCT_FROM_FAVORITE,
    payload: productId
})

export const logOut = () => ({
    type: ActionTypes.LOGOUT
})
export const takePhoto = (uri) => ({
    type: ActionTypes.TAKE_PHOTO,
    payload: uri
})