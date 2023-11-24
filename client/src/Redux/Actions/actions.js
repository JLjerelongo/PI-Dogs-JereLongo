import axios from "axios";
import {
    GET_DOGS,
    FILTER_TEMPERAMENT,
    CREATE_DOG,
    SORT_DOGS,
    SET_DOG_DETAIL,
    GET_DB,
    GET_TEMPERAMENTS,
    DOG_BY_NAME,
    API,
    DB
} from "./actions-types";


export const fetchDogs = () => {
    const endpoint = "http://localhost:3001/dogs";
    return async (dispatch) => {
      try {
        const { data } = await axios(endpoint);
        console.log(data);
        return dispatch({
          type: GET_DOGS,
          payload: data,
        });
      } catch (error) {
        console.error(error.message);
      }
    };
  };

//   export const fetchDogsApi = () => {
//     return {
//         type: fetchDogsApi,
//     }
//   }

  export const dogsByName = (name) => {
    const endpoint = `http://localhost:3001/dogs/name/?name=${name}`;
    return async (dispatch) => {
      try {
        const { data } = await axios(endpoint);
        console.log(data);
        return dispatch({
          type: DOG_BY_NAME,
          payload: data,
        });
      } catch (error) {
        console.error(error.message);
      }
    };
  };


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
    return {
        type: origin
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
  };
  

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

export const fetchDogsDb = () => {
    return async (dispatch) => {
        try {

            const dogsOfDb = (await axios("http://localhost:3001/dogs")).data
            if (dogsOfDb.length > 0) {
                const findAllDogs = dogsOfDb.filter((dog) => dog.id.length > 5)
                dispatch({
                    type: "GET_DB",
                    payload: findAllDogs
                })
            }

        } catch (error) {
            return error.message
        }
    }
}

export const filterApi = () => {
    const endpoint = "http://localhost:3001/dogs";
    return async (dispatch) => {
      try {

        const { data } = await axios(endpoint);
        const filtrados = await data.filter((dog) => 
            !isNaN(dog.id)
        )
        return dispatch({
          type: GET_DOGS,
          payload: filtrados,
        });
      } catch (error) {
        console.error(error.message);
      }
    };
  };