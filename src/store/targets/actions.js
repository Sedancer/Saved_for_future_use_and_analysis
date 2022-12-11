import http from "@/http";
import baseUrl from "@/http/url";
import Types from "./actionType";
import {SET_ERROR as ErrorModule, GET_ERROR_STRUCTURE} from "./../modals/actions";
import moment from "moment";
import {isEmpty} from "lodash";

const SET_ERROR = ErrorModule("Об'єкти");

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

// TODO: Сюда добавить бы фильтрацию
// Возможно новый подход команд узнать обновились ли данные

export const GET_TARGETS_POST = ({filterList, params}) => {
  return async (dispatch, getStore) => {
    try {
      const postParams = {
        page: params?.page,
        limit: params?.limit,
        sortField: params?.sortField,
      }
      if (params?.isAsc) postParams.isAsc = params?.isAsc;
      if (!isEmpty(filterList)) {
        filterList.forEach(
          ({name, value}) => {
            if(value.type === 'text') {
              if(value?.value) postParams[name] = value?.value
            }
            if(value.type === 'autocomplete') {
              if(value?.value) postParams[name] = value?.value?.value
            }
            if(value.type === 'dateTimePicker') {
              if(value?.value) postParams[name] = value?.value
            }
            if(value.type === 'strictly') {
              if(value?.value) {
                postParams[name] = +value?.value;
                if(name === 'neId' && value?.strictly) postParams.isStrictNeId = value?.strictly;
                if(name === 'targetId' && value?.strictly) postParams.isStrictTargetId = value?.strictly;
              }
            }
          }
        );
      }

      dispatch(FETCHING("targets", true));

      const { data: { targets , totalItems }} = await http.post(baseUrl + "/targets", {
        ...postParams
      });

      const items = targets.map((item) => ({
        ...item,
        activationTime: moment(item.activationTime).format("YYYY-MM-DD HH:mm"),
        endTime: moment(item.endTime).format("YYYY-MM-DD HH:mm"),
      }));
      dispatch(SET(Types.SET_TARGETS, {
        targets: items,
        total: totalItems
      }));
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит об'єктів")));
    } finally {
      dispatch(FETCHING("targets", false));
    }
  };
};

// export const GET_TARGETS = (filterList) => {
// 	return async (dispatch, getStore) => {
// 		try {
//
// 			// const params = filterList.map(({name, value}) => `${name}=${value}`);
// 			// const getParams = params.length ? '?' + params.join(';'): '';
//
// 			dispatch(FETCHING("targets", true));
// 			// const {data} = await http.get(baseUrl + "/targets" + getParams);
// 			const {data} = await http.get(baseUrl + "/targets");
// 			const targets = data.map((item) => ({
// 				...item,
// 				activationTime: moment(item.activationTime).format("YYYY-MM-DD HH:mm"),
// 				endTime: moment(item.endTime).format("YYYY-MM-DD HH:mm"),
// 			}));
//
// 			// const {targets: oldTargets} = getStore().targets || {};
// 			//
// 			// if(!isEmpty(oldTargets)) {
// 			//
// 			// }
//
// 			dispatch(SET(Types.SET_TARGETS, targets));
// 		} catch (err) {
// 			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит об'єктів")));
// 		} finally {
// 			dispatch(FETCHING("targets", false));
// 		}
// 	};
// };

export const GET_TARGET_INFO = (targetId,neId ) => {
	return async (dispatch) => {
		try {
			dispatch(FETCHING("targets", true));
			const {data} = await http.get(`${baseUrl}/targetInfo?targetId=${targetId}&neId=${neId}`);
			dispatch(SET(Types.SET_TARGET, data));
		} catch (err) {
			dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит об'єктів")));
		} finally {
			dispatch(FETCHING("targets", false));
		}
	};
};

// eslint-disable-next-line no-unused-expressions
export const filterTargets = (filterList) => ({type: Types.FILTER_TARGETS, filterList});
