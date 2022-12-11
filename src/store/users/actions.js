import jwt_decode from "jwt-decode";
import Types from "./actionType";
import http from "@/http";
import baseUrl from "@/http/url";
import { SET_ERROR as ErrorModule, GET_ERROR_STRUCTURE } from "./../modals/actions";
const SET_ERROR = ErrorModule("Користувачi");

const FETCHING = (name, bool) => ({
  type: Types.FETCHING,
  payload: {
    req: name,
    value: bool,
  },
});

const SET = (type, payload) => ({
  type: Types[type],
  payload,
});

export const ON_LOGIN = (DTO) => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("login", true));
      dispatch(SET(Types.LOGIN, { isAuthError: false }));
      const { data: token } = await http.post(`${baseUrl}/account/login`, DTO);
      const { UserId, UserName, UserRoles, exp } = jwt_decode(token);
      // console.log(exp, new Date(exp));
      const LOGIN_DTO = {
        userId: UserId,
        login: UserName,
        claims: UserRoles,
        token: token,
        exp: exp,
        isAuthError: false,
      };
      localStorage.setItem("user", JSON.stringify(LOGIN_DTO));
      dispatch(SET(Types.LOGIN, LOGIN_DTO));
    } catch (err) {
      console.log(err);
      dispatch(SET(Types.LOGIN, { isAuthError: true }));
      // SET_ERROR('login',err)
    } finally {
      dispatch(FETCHING("login", false));
    }
  };
};
export const LOGOUT = () => {
  return async () => {
    localStorage.removeItem("tables");
    localStorage.removeItem("user");
    window.location.replace("/");
  };
};
export const GET_LOGIN_DTO_FROM_STORAGE = () => {
  return async (dispatch) => {
    const LOGIN_DTO = localStorage.getItem("user");
    // console.log(LOGIN_DTO);
    if (LOGIN_DTO) {
      dispatch(SET(Types.LOGIN, JSON.parse(LOGIN_DTO)));
    }
    dispatch(SET(Types.LOADING_TOKEN, false));
  };
};

export const CHECK_USERNAME = (name) => {
  return async (dispatch, getStore) => {
    try {
      dispatch(FETCHING("checkUserName", true));
      dispatch(SET(Types.CHECK_LOGIN, null));
      const { data: isBusy } = await http.get(`${baseUrl}/users/user/${name}`);
      if (isBusy) {
        dispatch(SET(Types.CHECK_LOGIN, " користувач з таким логіном вже існує"));
      } else {
        dispatch(SET(Types.CHECK_LOGIN, null));
      }
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Помилка запиту перевірки унікальності логіна")));
    } finally {
      dispatch(FETCHING("checkUserName", false));
    }
  };
};
export const GET_USERS = () => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("getUser", true));
      const { data } = await http.get(`${baseUrl}/users`);

      dispatch(SET(Types.SET_USERS, data));
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Помилка запиту користувачiв")));
    } finally {
      dispatch(FETCHING("getUser", false));
    }
  };
};

export const ADD_USER = (DTO) => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("addUser", true));
      await http.post(`${baseUrl}/users/add`, DTO);
      dispatch(GET_USERS());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Помилка запиту додавання користувача")));
    } finally {
      dispatch(FETCHING("addUser", false));
    }
  };
};

export const EDIT_USER = (DTO) => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("editUser", true));
      await http.put(`${baseUrl}/users/editInfo`, DTO);
      dispatch(GET_USERS());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Помилка запиту редагування користувача")));
    } finally {
      dispatch(FETCHING("editUser", false));
    }
  };
};

export const DELETE_USER = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("deleteUser", true));

      await http.delete(`${baseUrl}/users/delete/${userId}`);
      dispatch(GET_USERS());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Помилка запиту редагування користувача")));
    } finally {
      dispatch(FETCHING("deleteUser", false));
    }
  };
};
export const A_CHTO_TAK_MOJNO_CHTOLI = (DTO) => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("herZnaetChtoZaEbola", true));
      await http.put(`${baseUrl}/users/editCredentials`, DTO);
      dispatch(GET_USERS());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Помилка запиту редагування користувача")));
    } finally {
      dispatch(FETCHING("herZnaetChtoZaEbola", false));
    }
  };
};
