import * as ActionTypes from './ActionTypes';

export const account = (state = {username, email, password}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ACCOUNT: 
            return {username: action.payload.username, email: action.payload.email, password: action.payload.password}
        default:
            return state
    }
}