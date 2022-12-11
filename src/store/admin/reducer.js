import Types from "./actionType";
import { cloneDeep } from "lodash";

const initialState = {
  log: null,
  mode: null,
  language: 'uk'
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_LOG:
      return cloneDeep({
        ...state,
        log: action.payload,
      });

    case Types.SET_MODE:
      return cloneDeep({
        ...state,
        mode: action.payload,
      });

    case Types.CHANGE_LANGUAGE:
      return cloneDeep({
        ...state,
        language: action.payload
      });
    case "LOGIN":
      return initialState;
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export default reducer;
