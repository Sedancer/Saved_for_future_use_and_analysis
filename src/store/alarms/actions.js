import http from "@/http";
import baseUrl from "@/http/url";
import Types from "./actionType";
import {SET_ERROR as ErrorModule, GET_ERROR_STRUCTURE} from "./../modals/actions";
import moment from "moment";

const SET_ERROR = ErrorModule("Аварії");

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

export const GET_ALARMS = () => {
	return async (dispatch) => {
		try {
			dispatch(FETCHING("alarms", true));
			const { data } = await http.get(baseUrl + "/alarms");
			const alarms = data.map((item) => ({
				...item,
				formatTime: moment(item.time).format("YYYY-MM-DD HH:mm")
			}));
			dispatch(SET(Types.SET_ALARMS, alarms));
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит Аварій")));
		} finally {
			dispatch(FETCHING("alarms", false));
		}
	};
};

// eslint-disable-next-line no-unused-expressions
export const filterAlarms = (filterList) => ({type: Types.FILTER_ALARMS, filterList});