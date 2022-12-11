import Types from "./actionType";
import { cloneDeep } from "lodash";

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOAD_SELECTS:
      return cloneDeep({
        ...state,
        selects: action.payload,
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
