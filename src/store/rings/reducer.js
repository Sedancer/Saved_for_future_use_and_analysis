import Types from "./actionType";
import {cloneDeep} from "lodash";

const initialState = {
	rings: [],
	fetching: {},
  total: 0,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.SET_CALL:
			return cloneDeep({
				...state,
        rings: action.payload?.rings,
        total: action.payload?.total
			});

		case Types.FETCHING:
			return cloneDeep({
				...state,
				fetching: {
					...state.fetching,
					[action.payload.req]: action.payload.value,
				},
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
