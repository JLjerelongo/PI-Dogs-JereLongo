import axios from "axios";
import {
    GET_DOGS,
    FILTER_TEMPERAMENT,
    FILTER_ORIGIN,
    CREATE_DOG,
    SORT_DOGS,
    SET_DOG_DETAIL,
    GET_TEMPERAMENTS
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

export const getTemperaments = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/temperaments');
        const temperaments = response.data;
        dispatch({ type: 'GET_TEMPERAMENTS', payload: temperaments });
      } catch (error) {
        console.error('Error fetching temperaments:', error);
      }
    };
  };

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
            dispatch({
                type: CREATE_DOG,
                payload: data
            });
            dispatch(searchDogs());
        } catch (error) {
            throw Error(error.message);
        }
    }
}

export const sortDogs = (sortBy) => {
    return {
        type: SORT_DOGS,
        payload: sortBy,
    };
}

export const fetchDogDetail = (dogId) => {
    return async (dispatch) => {
      try {
        const endPoint = `http://localhost:3001/dogs/${dogId}`;
        const { data } = await axios(endPoint);
        dispatch({
          type: SET_DOG_DETAIL,
          payload: data,
        });
      } catch (error) {
        console.error('Error fetching dog detail:', error);
        throw Error(error.message);
      }
    };
  };
  