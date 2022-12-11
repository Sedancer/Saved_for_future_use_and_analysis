import http from "@/http";
import baseUrl from "@/http/url";
import Types from "./actionType";

import {SET_ERROR as ErrorModule, GET_ERROR_STRUCTURE} from "./../modals/actions";
const SET_ERROR = ErrorModule("SELECTS");

const SET = (type, payload) => ({
	type: Types[type],
	payload,
});

export const LOAD_SELECTS = () => {
  return async (dispatch) => {
    try {
      const { data } = await http.get(baseUrl + "/selectsValues");
      dispatch(SET(Types.LOAD_SELECTS, data));
    } catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "SELECTS")));
    }
  };
};
