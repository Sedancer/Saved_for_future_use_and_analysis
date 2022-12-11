import Types from "./actionType";
import {cloneDeep} from "lodash";
import filterDataFromField from "@/utils/filterDataFromField";

const initialState = {
	start: [],
	alarms: [],
	filterList: [],
	fetching: {},
};


function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.SET_ALARMS:
			const alarms = action.payload;
			return cloneDeep({
				...state,
				start: alarms,
				alarms: filterDataFromField(alarms, state.filterList)
			});

		case Types.FILTER_ALARMS:
			return cloneDeep({
				...state,
				filterList: action.filterList,
				alarms: filterDataFromField(state.start, action.filterList)
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
