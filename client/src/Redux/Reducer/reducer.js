import {
    CREATE_DOG,
    GET_DOGS,
    TEMPERAMENT,
    FILTER_TEMPERAMENT,
    FILTER_ORIGIN
  } from "../Actions/actions-types";

let initialState = {
    allDogs: [],
    dogs: [],
    allTemperamets: [],
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_DOGS: 
        return {
            ...state,
            allDogs: actions.payload,
            dogs: actions.payload,
        };

        case FILTER_TEMPERAMENT:
            const temperament = actions.payload;
            const filteredDogs = state.allDogs.filter((dog) =>
            dog.temperamento.includes(temperament)
            );
        return {
            ...state,
            dogs: filteredDogs,
        };

        case FILTER_ORIGIN:
            if(actions.payload = 'AllOrigins'){
                return {
                    ...state,
                    dogs: state.allDogs,
                }
            }
            if (actions.payload = 'Database'){
                const filteredOrigin = state.allDogs.filter((dog) =>
                dog.isDB)
                return {
                    ...state,
                    dogs: filteredOrigin
                }
            }
            if(actions.payload = 'API'){
                const filteredOrigin = state.allDogs.filter((dog) =>
                !dog.isDB)
                return {
                    ...state,
                    dogs: filteredOrigin
                }
            }

        case CREATE_DOG:
            return {
                ...state,
                dogs: actions.payload,
            };

        case TEMPERAMENT:
            return {
                ...state,
                temperament: actions.payload,
            };

        default:
            return{
            ...state,
        };
    }
}

export default reducer;