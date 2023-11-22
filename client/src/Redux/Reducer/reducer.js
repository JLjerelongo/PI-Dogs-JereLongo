import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  FILTER_ORIGIN,
  CREATE_DOG,
  SORT_DOGS,
  SET_DOG_DETAIL,
  FILTER_TEMPERAMENT,
  GET_DB
} from "../Actions/actions-types";

let initialState = {
  allDogs: [],
  dogs: [],
  temperaments: [],
  dogsDb: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case FILTER_ORIGIN:
        return {
          ...state,
          dogs: [...state.dogsDb]
        };

    case FILTER_TEMPERAMENT:
      if (action.payload === "") {
        return {
          ...state,
          dogs: state.allDogs,
        };
      } else {
        const filteredByTemperament = state.allDogs.filter((dog) =>
          dog.temperamento.includes(action.payload)
        );
        return {
          ...state,
          dogs: filteredByTemperament,
        };
      }

    case CREATE_DOG:
      return {
        ...state,
        dogs: action.payload,
      };

    case SORT_DOGS:
      const sortedDogs = [...state.dogs];
      if (action.payload === "asc") {
        sortedDogs.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (action.payload === "desc") {
        sortedDogs.sort((a, b) => b.nombre.localeCompare(a.nombre));
      }
      return {
        ...state,
        dogs: sortedDogs,
      };

    case SET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };

      case GET_DB:
        return{
          ...state,
          dogsDb: action.payload
        }

    default:
      return {
        ...state,
      };
  }
};

export default reducer;