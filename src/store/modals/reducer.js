import Types from "./actionType";
import _ from "lodash";
import { LOAD_USER_ERROR } from "redux-oidc";
interface Action {
    type: Types;
    payload: any;
}
const initialState = {
    errors: [],
    isAuthError: false,
};

function reducer(state = initialState, action: Action) {
    switch (action.type) {
        case Types.SET_ERROR:
            return _.cloneDeep({
                errors: [...state.errors, action.payload],
            });
        case LOAD_USER_ERROR:
            return _.cloneDeep({
                ...state,
                isAuthError: true,
            });

        // case Types.USER_SIGNED_OUT:
        //   return _.cloneDeep({
        //     ...state,
        //     isAuthError: false
        //   });
        case Types.DELETE_ERROR:
            return _.cloneDeep({ errors: state.errors.filter((error) => !action.payload.includes(error.id)) });
        case Types.LOGIN:
            return initialState;
        case Types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default reducer;
