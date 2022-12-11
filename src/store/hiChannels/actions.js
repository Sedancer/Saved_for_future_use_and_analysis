import http from "@/http";
import baseUrl from "@/http/url";
import Types from "./actionType";
import {SET_ERROR as ErrorModule, GET_ERROR_STRUCTURE} from "./../modals/actions";

const SET_ERROR = ErrorModule("Hi Channels");

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

export const GET_HI = () => {
	return async (dispatch) => {
		try {
			// dispatch(()=>({type: Types.LOAD_HI_REQUEST}));
			dispatch(FETCHING("hi", true));
			const {data} = await http.get(baseUrl + "/HiChannels/status");
			dispatch(SET(Types.SET_HI, data));
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит статусів hiChannels")));
		} finally {
			dispatch(FETCHING("hi", false));
		}
	};
};

export const GET_HI_STATUSES = () => {
	return async (dispatch) => {
		try {
			dispatch(() => ({type: Types.LOAD_HI_STATUSES_REQUEST}));
			dispatch(FETCHING("hiS", true));
			const {data} = await http.get(baseUrl + "/HiChannels/lastMessages");
			dispatch(SET(Types.SET_HI_STATUSES, data));
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит останніх повідомлень hiChannels")));
		} finally {
			dispatch(FETCHING("hiS", false));
		}
	};
};
