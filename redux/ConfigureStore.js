import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { products } from './productsReducer';
import { populars } from './popularDishesReducer';
import { cart } from './cartReducer';
import { favorites } from './favortiesReducer'
import { account } from './accountReducer';
import { favoriteProducts } from './favoriteProductsReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
    key: 'root',
    storage,
    debug: true
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            products,
            populars,
            cart,
            favorites,
            account,
            favoriteProducts
        }),
        composeWithDevTools(applyMiddleware(thunk, logger))
    );

    const persistor = persistStore(store);

    return { persistor, store };
}