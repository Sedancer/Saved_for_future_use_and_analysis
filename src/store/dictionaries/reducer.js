import Types from "./actionType";
import _ from "lodash";

const initialState = {
  activities: [],
  departments: [],
  regions: [],
  actions: [],
  error: false,
  errorMessage: "",
  fetching: {
    create: false,
    get: false,
    update: false
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.DICTIONARY_SUCCESS:
      return _.cloneDeep({
        ...state,
        isFatching: false,
        [action.payload.prop]: action.payload.value
      });
    case Types.DICTIONARY_REQUEST:
      return _.cloneDeep({ ...state, isFatching: false });
    case Types.DICTIONARY_ERROR:
      return _.cloneDeep({
        ...state,
        isFatching: false,
        error: true,
        errorMessage: action.payload
      });
    case Types.FETCHING:
      return _.cloneDeep({
        ...state,
        fetching: {
          ...state.fetching,
          [action.payload.req]: action.payload.value
        }
      });
    default:
      return state;
  }
}

export default reducer;
