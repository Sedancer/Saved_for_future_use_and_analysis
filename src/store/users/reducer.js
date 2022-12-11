import Types from "./actionType";
import { cloneDeep } from "lodash";

const initialState = {
    userId: null,
    isAuthError: false,
    loadingToken: true,
    users: [],
    login: null,
    isLoginFree: null,
    fetching: {},
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.LOADING_TOKEN:
            return {
                ...state,
                loadingToken: false,
            };
        case Types.LOGIN:
            return cloneDeep({
                ...state,
                ...action.payload,
            });
        case Types.LOGOUT:
            return initialState;
        case Types.CHECK_LOGIN:
            return {
                ...state,
                isLoginFree: action.payload,
            };
        case Types.SET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case Types.FETCHING:
            return cloneDeep({
                ...state,
                fetching: {
                    ...state.fetching,
                    [action.payload.req]: action.payload.value,
                },
            });
        default:
            return state;
    }
}

export default reducer;
