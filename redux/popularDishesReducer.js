import * as ActionTypes from './ActionTypes';

export const populars = (state = {isLoading: true, errMess: null, populars: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_POPULARS:
            return {...state, isLoading: false, errMess: null, populars: action.payload};

        case ActionTypes.POPULARS_LOADING:
            return {...state, isLoading: true, errMess: null, populars: []}

        case ActionTypes.POPULARS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      } 
}