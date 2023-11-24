import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  CREATE_DOG,
  SORT_DOGS,
  SET_DOG_DETAIL,
  FILTER_TEMPERAMENT,
  GET_DB,
  DOG_BY_NAME,
  DB,
  API
} from "../Actions/actions-types";

let initialState = {
  allDogs: [],
  allDogsCopy: [],
  dogs: [],
  temperaments: [],
  dogsDb: [],
  dogByName: []
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload,
        allDogsCopy: action.payload
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case DB:
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
      const { field, order } = action.payload;
      const sortedDogs = [...state.dogs];

      if (field === 'nombre') {
        sortedDogs.sort((a, b) => (order === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)));
      } else if (field === 'peso') {
        sortedDogs.sort((a, b) => {
          const parseWeight = (weight) => {
            const [min, max] = weight.split(' - ');
            const parsedWeight = (parseInt(min) + parseInt(max)) / 2;
            return parsedWeight;
          };

          const weightA = parseWeight(a.peso);
          const weightB = parseWeight(b.peso);

          return order === 'asc' ? weightA - weightB : weightB - weightA;
        });
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
      return {
        ...state,
        dogsDb: action.payload
      }

      case "Todos":
        return{
          ...state,
          dogs: state.allDogs
        }

      case API:
        return{
          ...state,
          dogs: action.payload
        }

      case DOG_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
        allDogsCopy: action.payload
      };


    default:
      return {
        ...state,
      };
  }
};

export default reducer;
