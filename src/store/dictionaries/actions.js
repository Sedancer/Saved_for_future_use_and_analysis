import http from "@/http";
// import baseUrl from "@/http/url";
import Types from "./actionType";
import { SET_ERROR } from "./../modals/actions";
const version = process.env.VERSION;

export const DICTIONARY_REQUEST = () => ({
  type: Types.DICTIONARY_REQUEST,
  payload: true
});
export const DICTIONARY_SUCCESS = (prop, value) => ({
  type: Types.DICTIONARY_SUCCESS,
  payload: {
    prop,
    value
  }
});

const FETCHING = (name, bool) => ({
  type: Types.FETCHING,
  payload: {
    req: name,
    value: bool
  }
});
export const DICTIONARY_ERROR = error => ({
  type: Types.DICTIONARY_ERROR,
  payload: error
});

export const DICTIONARY_FETCH = type => {
  return async dispatch => {
    try {
      dispatch(FETCHING("get", true));
      dispatch(DICTIONARY_REQUEST());
      const { data } = await http.get(`${process.env.DICTIONARYGATEWAY}/api/${version}/${type}`);
      const prop = type.toLowerCase();
      dispatch(DICTIONARY_SUCCESS(prop, data));
      dispatch(FETCHING("get", false));
      return data;
    } catch (e) {
      dispatch(DICTIONARY_ERROR(e));
      dispatch(FETCHING("get", false));
      dispatch(SET_ERROR(e));
    }
  };
};
// for auto update
export const DICTIONARY_FETCH_AUTO = type => {
  return async dispatch => {
    try {
      dispatch(FETCHING("get", true));
      dispatch(DICTIONARY_REQUEST());
      const { data } = await http.get(`${process.env.DICTIONARYGATEWAY}/api/${version}/${type}`);
      //const prop = type.toLowerCase();
      // dispatch(DICTIONARY_SUCCESS(prop, data));
      dispatch(FETCHING("get", false));
      return data;
    } catch (e) {
      dispatch(DICTIONARY_ERROR(e));
      dispatch(FETCHING("get", false));
      dispatch(SET_ERROR(e));
    }
  };
};
