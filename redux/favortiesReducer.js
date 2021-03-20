import * as ActionTypes from './ActionTypes';

function removeItem(array, id) {
    const index = array.indexOf(id)
    if (index > -1) {
        array.splice(index, 1)
    }
    return array
}

export const favorites = (state=[], action) => {
    switch(action.type) {
        case ActionTypes.MARK_FAVORITE:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);
        default:
            return state    
    }
}

