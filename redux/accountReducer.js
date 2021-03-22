import * as ActionTypes from './ActionTypes';

export const account = (state = {username: null, email: null, password: null}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ACCOUNT: 
            return {username: action.payload.username, email: action.payload.email, password: action.payload.password}
        default:
            return state
    }
}