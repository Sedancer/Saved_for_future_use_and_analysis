import Types from "./actionType";
import { cloneDeep } from "lodash";
import {
	users,
	targetInfo,
	commutators,
	audit,
  auditPeriod,
  auditPlanned,
	syncTargets,
	alarms,
	targets,
	ring
} from "@constants/tables"

const initialState = {
	tables: {
		users: users,
		targetInfo: targetInfo,
		commutators: commutators,
		audit: audit,
    auditPeriod: auditPeriod,
    auditPlanned: auditPlanned,
		syncTargets: syncTargets,
		alarms: alarms,
		targets: targets,
		ring: ring,
	}
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.SET_SETTINGS_TABLE:
			return cloneDeep({
				...state,
				tables: action.payload,
			});

		case Types.UPDATE_SETTINGS_TABLE:
			return cloneDeep({
				...state,
				tables: action.payload,
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
