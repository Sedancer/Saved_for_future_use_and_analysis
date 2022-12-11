import http from "@/http";
import baseUrl from "@/http/url";
import Types from "./actionType";
import { SET_ERROR as ErrorModule, GET_ERROR_STRUCTURE } from "./../modals/actions";
const SET_ERROR = ErrorModule("Налаштування");

const FETCHING = (name, bool) => ({
  type: Types.FETCHING,
  payload: {
    req: name,
    value: bool,
  },
});

const SET = (type, payload) => ({
  type,
  payload,
});

export const GET_LOG_LEVEL = () => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("logLevel", true));
      const { data: log } = await http.get(baseUrl + "/log/getMinimumLevel");
      dispatch(SET(Types.SET_LOG, log));
    } catch (err) {
      console.log(err);
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "")));
    } finally {
      dispatch(FETCHING("logLevel", false));
    }
  };
};

export const GET_MODE = () => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("getMode", true));
      const { data: mode } = await http.get(baseUrl + "/log/getConcealMode");
      dispatch(SET(Types.SET_MODE, mode));
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "")));
    } finally {
      dispatch(FETCHING("getMode", false));
    }
  };
};

export const SET_LOG = (logLevel) => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("logLevel", true));
      await http.post(baseUrl + "/log/changeMinimumLevel", null, {
        params: { minimumLevel: logLevel },
      });
      dispatch(GET_LOG_LEVEL());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "")));
    } finally {
      dispatch(FETCHING("logLevel", false));
    }
  };
};
export const SET_MODE = (mode) => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("setMode", true));
      await http.post(baseUrl + "/log/changeConcealMode", null, {
        params: { concealMode: mode },
      });
      dispatch(GET_MODE());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "")));
    } finally {
      dispatch(FETCHING("setMode", false));
    }
  };
};
