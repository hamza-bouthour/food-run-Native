import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { products } from './productsReducer';
import { populars } from './popularDishesReducer';
import { cart } from './cartReducer'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products,
            populars,
            cart
        }),
        composeEnhancer(applyMiddleware(thunk))
    );

    return store;
}