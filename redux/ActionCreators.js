import * as ActionTypes from './ActionTypes';
// const popularsJs = require('../shared/fake.json')
// const uri = '../shared/fake.json/'
// const popularsJson = JSON.stringify(popularsJs)
import { POPULARS } from '../shared/populars'
export const fetchPopulars = () => dispatch => {
    console.log('../shared/popularsJSON.json')
    dispatch(popularsLoading())
    setTimeout(() => {
        dispatch(addPopulars(POPULARS))
    }, 1000);
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