import {DELETE, UPDATE, FETCH_ALL, CREATE} from '../../constants/actionType'
import * as api from '../../../API';

// action creator
export const getMenuDetail = () => async (dispatch) => { 
    try {
        const { data } = await api.fetchDetail();

        dispatch({ type:  FETCH_ALL, payload: data })
       
    } catch (error) {
        console.log('get error ==> ', error)
    }
}

export const addMenuDetail = (products) => async (dispatch) => {
    try {   
        const {data} = await  api.addDetail(products)

        dispatch({ type: CREATE , payload: data})
    } catch (error) {
        console.log('post error ==> ', error)
    }
}