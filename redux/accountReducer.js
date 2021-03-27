import * as ActionTypes from './ActionTypes';

export const account = (state = {username: null, email: null, password: null, subscribed: false, photo: null}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ACCOUNT: 
            return {...state, username: action.payload.userName, email: action.payload.email, password: action.payload.password}
        case ActionTypes.LOGOUT:
            return  {username: null, email: null, password: null}
        case ActionTypes.TAKE_PHOTO:
            return {...state, photo: action.payload}
        default:
            return state
    }
}