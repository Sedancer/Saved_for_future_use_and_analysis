import { sortBy } from "lodash";
import http from "@/http";
import baseUrl from "@/http/url";
import Types from "./actionType";
import { SET_ERROR as ErrorModule, GET_ERROR_STRUCTURE } from "./../modals/actions";
import { renderDateTime } from "@/utils/renderDateTime"
const SET_ERROR = ErrorModule("Аудит та Синхронізація");

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

export const GET_SYNC = () => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("sync", true));
      const { data } = await http.get(baseUrl + "/audits");
      let audits = data.map((item) => {
        return {
          ...item,
          timeStart: renderDateTime(item.lastAuditStartTime, true),
          timeEnd: renderDateTime(item.lastAuditFinishTime, true),
          timeNextAuditStart: renderDateTime(item.nextAuditTime, true),
          isFinished: item.isFinished ? "Так" : "Ні",
        };
      });
      audits = sortBy(audits, ({lastAuditFinishTime}) => lastAuditFinishTime);
      audits = audits.reverse();
      const result = audits.reduce(
        (acc, val) => {
          if (val.auditType === 0) {
            acc.one = [...acc.one, val];
          } else {
            if (val.periodInDays === 0) {
              acc.planned = [...acc.planned, val];
            } else {
              acc.period = [...acc.period, val];
            }
          }
          return acc;
        },
        { one: [], period: [], planned: [] }
      );
      dispatch(SET(Types.SET_SYNC, result));
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит синхронізації")));
    } finally {
      dispatch(FETCHING("sync", false));
    }
  };
};

export const ADD_SYNC_NOW = (form) => {
  return async (dispatch, getStore) => {
    try {
      dispatch(FETCHING("addSync", true));
      const { userId } = getStore().users;
      const DTO = {
        ...form,
        userId,
      };
      await http.post(baseUrl + "/audits/addImmediate", DTO);
      dispatch(GET_SYNC());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит додавання негайной синхронізації ")));
    } finally {
      dispatch(FETCHING("addSync", false));
    }
  };
};

export const GET_SYNC_NOW = () => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("GET_SYNC_NOW", true));
      await http.get(baseUrl + "/audits/syncAll");
      dispatch(GET_SYNC());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "... Запит додавання негайной синхронізації ")));
    } finally {
      dispatch(FETCHING("GET_SYNC_NOW", false));
    }
  };
};

export const ADD_SYNC_PERIOD = (form) => {
  return async (dispatch, getStore) => {
    try {
      dispatch(FETCHING("addSync", true));
      const { userId } = getStore().users;
      const DTO = {
        ...form,
        userId,
      };
      await http.post(baseUrl + "/audits/addPeriodic", DTO);
      dispatch(GET_SYNC());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит додавання періодичної синхронізації ")));
    } finally {
      dispatch(FETCHING("addSync", false));
    }
  };
};

export const EDIT_SYNC_PERIOD = (form) => {
  return async (dispatch, getStore) => {
    try {
      dispatch(FETCHING("editSync", true));
      const { userId } = getStore().users;
      const DTO = {
        ...form,
        userId,
      };
      await http.put(baseUrl + "/audits/editPeriodic", DTO);
      dispatch(GET_SYNC());
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит редагування періодичної синхронізації ")));
    } finally {
      dispatch(FETCHING("editSync", false));
    }
  };
};

export const ON_INFO_SYNC = (id, ovopId, date, periodInDays) => {
  return async (dispatch, getStore) => {
    try {
      dispatch(FETCHING("infoSync", true));
      const { commutators } = getStore().commutators;
      const { ovopName } = commutators.find((c) => c.ovopId === ovopId);
      const { data } = await http.get(baseUrl + "/audits/details/" + id);
      let tableData = [];
      data.targetsIds.forEach((_, i) => {
        const row = {
          targetId: data.targetsIds[i].toString(),
          identityType: data.identityTypes[i],
          identityValue: data.identityValues[i],
          auditResult: data.auditResults[i],
          syncResult: data.syncResults[i],
        };
        tableData.push(row);
      });

      dispatch(
        SET(Types.CURRENT_SYNC_INFO, {
          ovopName,
          date,
          tableData,
          periodInDays
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит додаткової інформації аудиту")));
    } finally {
      dispatch(FETCHING("infoSync", false));
    }
  };
};
export const CLOSE_INFO_SYNC = () => ({
  type: Types.CURRENT_SYNC_INFO,
  payload: null,
});

export const DELETE_SYNC = (id) => {
  return async (dispatch, getStore) => {
    try {
      dispatch(FETCHING("deleteSync", true));
      const {
        users: { userId },
        sync,
      } = getStore();
      let syncs = [...sync.syncs.one, ...sync.syncs.period, ...sync.syncs.planned];
      let { ovopId } = syncs.find((s) => s.auditId === id);
      const DTO = {
        auditId: id,
        userId,
        ovopId,
      };
      await http.delete(baseUrl + "/audits/delete", { data: DTO });
      dispatch(GET_SYNC());
    } catch (err) {
      console.log(err);
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит видалення синхронізації ")));
    } finally {
      dispatch(FETCHING("deleteSync", false));
    }
  };
};

export const DELETE_ALL_IMMEDIATE = () => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("deleteAllImmediate", true));
      await http.delete(baseUrl + "/audits/deleteAllImmediate");
      dispatch(SET(Types.DELETE_ALL_IMMEDIATE));
    } catch (err) {
      console.log(err);
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит видалення Негайні")));
    } finally {
      dispatch(FETCHING("deleteAllImmediate", false));
    }
  };
};
export const DELETE_ALL_PERIODIC = () => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("deleteAllPeriodic", true));
      await http.delete(baseUrl + "/audits/deleteAllPeriodic");
      dispatch(SET(Types.DELETE_ALL_PERIODIC));
    } catch (err) {
      console.log(err);
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит видалення Періодичні ")));
    } finally {
      dispatch(FETCHING("deleteAllPeriodic", false));
    }
  };
};

export const DELETE_ALL_SCHEDULED = () => {
  return async (dispatch) => {
    try {
      dispatch(FETCHING("deleteAllScheduled", true));
      await http.delete(baseUrl + "/audits/deleteAllScheduled");
      dispatch(SET(Types.DELETE_ALL_SCHEDULED));
    } catch (err) {
      console.log(err);
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит видалення Заплановані ")));
    } finally {
      dispatch(FETCHING("deleteAllScheduled", false));
    }
  };
};

export const filterOne = (filterList) => ({ type:Types.FILTER_ONE, filterList });
export const filterPeriod = (filterList) => ({ type:Types.FILTER_PERIOD, filterList });
export const filterPlanned = (filterList) => ({ type:Types.FILTER_PLANNED, filterList });
export const filterCurrent = (filterList) => ({ type:Types.FILTER_CURRENT_INFO, filterList });
