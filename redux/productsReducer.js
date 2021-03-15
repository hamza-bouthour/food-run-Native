import * as ActionTypes from './ActionTypes';

export const products = (state = {isLoading: true, errMess: null, products: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PRODUCTS:
            return {...state, isLoading: false, errMess: null, products: action.payload};

        case ActionTypes.PRODUCTS_LOADING:
            return {...state, isLoading: true, errMess: null, products: []}

        case ActionTypes.PRODUCTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      } 
}