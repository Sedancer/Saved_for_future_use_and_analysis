import Types from "./actionType";
import { isEmpty } from "lodash";
import {SET_ERROR as SET_MODAL_ERROR} from "./../modals/actions";

export const UPDATE_TABLE_SETTINGS = (tableSettings, id) => {
	return async (dispatch, getStore) => {
		const {settings: {tables = {}} = {}} = getStore();
		const newSettings = {
			...tables,
			[id]: tableSettings
		};
		setSettingsToStorage(newSettings);
		dispatch(SET_SETTINGS_TABLE(newSettings));
	};
};

export const GET_TABLE_SETTINGS = () => {
	return async (dispatch) => {
		try {
			const tables = JSON.parse(window.localStorage.getItem("tables"));
			if (!isEmpty(tables)) {
				dispatch(SET_SETTINGS_TABLE(tables));
			} else {
				dispatch(SET_DEFAULT());
			}
		} catch (err) {
			// console.log(err);
			dispatch(SET_DEFAULT());
		}
	};
};

export const SET_DEFAULT = () => {
	return async (dispatch, getStore) => {
		try {
			const { settings: { tables = {} } = {}} = getStore();
			setSettingsToStorage(tables);
			dispatch(GET_TABLE_SETTINGS());
		} catch (err) {
			dispatch(SET_MODAL_ERROR(err));
		}
	};
};

const SET_SETTINGS_TABLE = (tables) => ({
	type: Types.SET_SETTINGS_TABLE,
	payload: tables,
});

const setSettingsToStorage = (tables) => {
	localStorage.setItem("tables", JSON.stringify(tables));
}
