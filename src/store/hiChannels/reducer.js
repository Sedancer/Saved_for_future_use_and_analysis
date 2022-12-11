import Types from "./actionType";
import {cloneDeep} from "lodash";

const initialState = {
	isLoadingHiStatuses: false,
	isLoadedHiStatuses: false,
	hi: null,
	hiStatuses: null,
	fetching: {},
};


function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.SET_HI:
			return cloneDeep({
				...state,
				hi: action.payload,
			});

		case Types.LOAD_HI_STATUSES_REQUEST:
			return cloneDeep({
				...state,
				isLoadingHiStatuses: true,
			});

		case Types.SET_HI_STATUSES:
			return cloneDeep({
				...state,
				isLoadingHiStatuses: false,
				isLoadedHiStatuses: true,
				hiStatuses: action.payload,
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
		default:
			return state;
	}
}

export default reducer;
