import Types from "./actionType";
import {cloneDeep} from "lodash";

const initialState = {
	targets: [],
	target: {},
	fetching: {},
  total: 0,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.SET_TARGET:
			const target = action.payload;
			return cloneDeep({
				...state,
				target:  target
			});

		case Types.SET_TARGETS:
			return cloneDeep({
				...state,
        targets: action.payload?.targets,
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
