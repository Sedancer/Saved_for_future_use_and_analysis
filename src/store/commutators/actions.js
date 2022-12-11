import http from "@/http";
import baseUrl from "@/http/url";
import Types from "./actionType";
import moment from "moment";
import { CLIENT_NAME } from '@/http/config';
import {SET_ERROR as ErrorModule, GET_ERROR_STRUCTURE} from "./../modals/actions";

const SET_ERROR = ErrorModule("ОВОП");

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
export const GET_COMMUTATORS = () => {
	return async (dispatch) => {
		try {
			dispatch(FETCHING("com", true));
			const {data} = await http.get(baseUrl + "/ovops");
			dispatch(SET(Types.SET_COMMUTATORS, data));
			dispatch(GET_STATUSES());
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит ОВОП")));
		} finally {
			dispatch(FETCHING("com", false));
		}
	};
};
const FULL_INFO = () => {
	return (dispatch, getStore) => {
		const {statuses, commutators} = getStore().commutators;
		dispatch(
			SET(
				Types.FULL_COMMUTATOR_INFO,
				commutators.map((c) => {
					const status = statuses.find((s) => s.ovopId === c.ovopId);
					return {
						...status,
						...c,
						sync: status.synchronizationStatus || false,
						x1: status.x1Status || false,
						x2: status.x2Status || false,
						x3: status.x3Status || false,
					};
				})
			)
		);
	};
};
export const GET_STATUSES = () => {
	return async (dispatch) => {
		try {
			dispatch(FETCHING("status", true));
			const {data} = await http.get(baseUrl + "/ovops/ovopsStatuses");

			const mainInfo = data.reduce(
        (acc, val) => {
          if (!val.x2Status) {
            acc.x2Status = false;
            acc.lostX2 = acc.lostX2 + 1;
          }
          if (!val.x3Status) {
            acc.x3Status = false;
            acc.lostX3 = acc.lostX3 + 1;
          }
          if (CLIENT_NAME === 'EricssonEps') {
            if (!val?.x1TcpStatus?.x1Status || !val?.x1SshStatus?.x1Status) {
              acc.x1Status = false;
              acc.lostX1 = acc.lostX1 + 1;
            }
          } else {
            if (!val.x1Status) {
              acc.x1Status = false;
              acc.lostX1 = acc.lostX1 + 1;
            }
            if (val.lastX2Message && val.lastX2Message !== "0001-01-01T00:00:00") {
              if (acc.lastX2Message) {
                if (moment(acc.lastX2Message).valueOf() < moment(val.lastX2Message).valueOf()) {
                  acc.lastX2Message = val.lastX2Message;
                  acc.x2OvopId = val.ovopId;
                }
              } else {
                acc.lastX2Message = val.lastX2Message;
                acc.x2OvopId = val.ovopId;
              }
            }
            if (val.lastX3Message && val.lastX3Message !== "0001-01-01T00:00:00") {
              if (acc.lastX3Message) {
                if (moment(acc.lastX3Message).valueOf() < moment(val.lastX3Message).valueOf()) {
                  acc.lastX3Message = val.lastX3Message;
                  acc.x3OvopId = val.ovopId;
                }
              } else {
                acc.lastX3Message = val.lastX3Message;
                acc.x3OvopId = val.ovopId;
              }
            }
          }
          if (!val.synchronizationStatus) {
            acc.syncError = acc.syncError + 1;
          }

          acc.x2Messages = acc.x2Messages + val.x2Messages;
          acc.x3Messages = acc.x3Messages + val.x3Messages;
          return acc;
        },
				{
					syncError: 0,
					x2OvopId: null,
					x3OvopId: null,
					lostX1: 0,
					lostX2: 0,
					lostX3: 0,
					synchronizationStatus: true,
					x1Status: true,
					x2Status: true,
					x3Status: true,
					x2Messages: 0,
					lastX2Message: "",
					x3Messages: 0,
					lastX3Message: "",
				}
			);
			dispatch(SET(Types.MAIN_INFO, mainInfo));
			dispatch(SET(Types.SET_COMMUTATORS_STATUS, data));
			dispatch(FULL_INFO());
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит статусів ОВОП")));
		} finally {
			dispatch(FETCHING("status", false));
		}
	};
};
export const DOP_INFO = (id) => {
	return async (dispatch) => {
		try {
			if (id === null) {
				dispatch(SET(Types.SET_DOP_INFO, null));
				return;
			}
			dispatch(FETCHING("dop", true));
			const {data} = await http.get(baseUrl + "/ovops/x1CommandsQueues");
			const current = data.find((q) => q.ovopId === id);
			dispatch(SET(Types.SET_DOP_INFO, current));
			//dispatch(FULL_INFO());
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит додаткової інформації ОВОП")));
		} finally {
			dispatch(FETCHING("dop", false));
		}
	};
};
export const ADD_COMMUTATOR = (commutator) => {
	return async (dispatch) => {
		try {
			dispatch(FETCHING("add", true));
			await http.post(baseUrl + "/ovops/add", commutator);
			dispatch(GET_COMMUTATORS());
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит створення ОВОП")));
		} finally {
			dispatch(FETCHING("add", false));
		}
	};
};
export const EDIT_COMMUTATOR = (commutator) => {
	return async (dispatch) => {
		try {
			dispatch(FETCHING("edit", true));
			await http.put(baseUrl + "/ovops/edit", commutator);
			dispatch(GET_COMMUTATORS());
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит редагування ОВОП")));
		} finally {
			dispatch(FETCHING("edit", false));
		}
	};
};
export const GET_MESSAGES = (id) => {
	return async (dispatch, getStore) => {
		if (id === null) {
			dispatch(SET(Types.SET_COMMUTATOR_CURRENT, null));
			return;
		}
		const commutator = getStore().commutators.full.find((c) => c.ovopId === id);
		const alarm = getStore().alarms.alarms.reduce(
			(acc, a) => {
				if (a.ovopId === id) {
					if (!moment(acc.date).isValid() || moment(acc.date).valueOf() < moment(a.time).valueOf()) {
						acc.date = a.time;
					}
					// eslint-disable-next-line no-unused-expressions
					acc.count + acc.count + 1;
					return acc;
				} else {
					return acc;
				}
			},
			{
				count: 0,
				date: "",
			}
		);
		try {
			dispatch(FETCHING("messages", true));
			const {data} = await http.get(baseUrl + "/ovops/lastMessages");
			let current = data.find((m) => m.ovopId === id);
			dispatch(SET(Types.SET_COMMUTATOR_CURRENT, {
				...commutator,
				alarmCount: alarm.count,
				alarmLast: alarm.date, ...current
			}));
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит останніх повідомлень ОВОП")));
		} finally {
			dispatch(FETCHING("messages", false));
		}
	};
};
export const CLEAR = (id) => {
	return async (dispatch, getStore) => {
		try {
			const {neId} = getStore().commutators.commutators.find((c) => c.ovopId === id);
			dispatch(FETCHING("clear", true));
			await http.get(baseUrl + "/ovops/x1ClearQueue/" + neId);
			dispatch(DOP_INFO(id));
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит на очищення черги X1 ОВОП")));
		} finally {
			dispatch(FETCHING("clear", false));
		}
	};
};

export const RECONECT = (id) => {
	return async (dispatch, getStore) => {
		try {
			const {neId} = getStore().commutators.commutators.find((c) => c.ovopId === id);
			dispatch(FETCHING("reconect", true));
			await http.get(baseUrl + "/ovops/x1Reconnect/" + neId);
			//dispatch(DOP_INFO(id));
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит на перепідключення ОВОП")));
		} finally {
			dispatch(FETCHING("reconect", false));
		}
	};
};

export const SYNC = (id) => {
	return async (dispatch, getStore) => {
		try {
			const {neId} = getStore().commutators.commutators.find((c) => c.ovopId === id);
			dispatch(FETCHING("sync", true));
			await http.get(baseUrl + "/ovops/x1Reconnect/" + neId);
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит знову підключитись x1 ОВОП")));
		} finally {
			dispatch(FETCHING("sync", false));
		}
	};
};
export const DELETE_COMMUTATOR = (id) => {
	return async (dispatch, getStore) => {
		try {
			const {neId} = getStore().commutators.commutators.find((c) => c.ovopId === id);
			dispatch(FETCHING("delete", true));
			await http.delete(baseUrl + "/ovops/delete/" + neId);
			dispatch(GET_COMMUTATORS());
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит видалення ОВОП")));
		} finally {
			dispatch(FETCHING("delete", false));
		}
	};
};

export const hasOvopName = async (ovopName) => {
	if (!ovopName) return false;
	const {data} = await http.get(baseUrl + "/ovops/ovop/ovopName/" + ovopName);
	return data
}

export const hasNeId = async (neId) => {
	if (!neId) return false;
	const {data} = await http.get(baseUrl + "/ovops/ovop/neId/" + neId);
	return data
};

// eslint-disable-next-line no-unused-expressions
export const filterCommutators = (filterList) => ({type: Types.FILTER_COMMUTATORS, filterList});

export const openCommutators = (isOpen) => ({type: Types.OPEN_ALL_COMMUTATORS, isOpen});
export const changeOpenCommutator = (name) => ({type: Types.CHANGE_OPEN_COMMUTATOR, name});
