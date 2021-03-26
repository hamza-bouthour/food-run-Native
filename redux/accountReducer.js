import * as ActionTypes from './ActionTypes';

export const account = (state = {username: null, email: null, password: null, subscribed: false}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ACCOUNT: 
            return {username: action.payload.userName, email: action.payload.email, password: action.payload.password, subscribed: true}
        default:
            return state
    }
}