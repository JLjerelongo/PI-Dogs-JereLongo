import axios from "axios";
import {
    GET_DOGS,
    CREATE_DOG,
    TEMPERAMENT,
    FILTER_TEMPERAMENT,
    FILTER_ORIGIN
} from "./actions-types";


export const searchDogs = () => {
    return async (dispatch) => {
        try {
            const endPoint = "http://localhost:3001/dogs";
            const { data } = await axios(endPoint);
            return dispatch({
                type: GET_DOGS,
                payload: data
            })
        } catch (error) {
            throw Error(error.message);
        }
    }
}

export const temperaments = () => {
    const endPoint = "http://localhost:3001/temperaments";
    return async (dispatch) =>{
        try {
            const { data } = await axios(endPoint);
            return dispatch({
                type: TEMPERAMENT,
                payload: data
            })
        } catch (error) {
            throw Error(error.message);
        }
    }
}

export const filterByTemperament = (selectedTemperament) => {
    return {
        type: FILTER_TEMPERAMENT,
        payload: selectedTemperament
    }
}

export const originFilter = (origin) => {
    return{
        type: FILTER_ORIGIN,
        payload: origin
    }
}

export const createDog = (dogData) => {
    const endPoint = "http://localhost:3001/dogs";
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endPoint, dogData);
            return dispatch({
                type: CREATE_DOG,
                payload: await searchDogs()
            })
        } catch (error) {
            throw Error(error.message);
        }
    }
}