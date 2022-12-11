import http from "@/http";
import baseUrl from "@/http/url";
import Types from "./actionType";
import {SET_ERROR as ErrorModule, GET_ERROR_STRUCTURE} from "./../modals/actions";
import moment from "moment";
import {isEmpty} from "lodash";

const SET_ERROR = ErrorModule("Поточні дзвінки");

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

export const GET_CALL_POST = ({filterList, params}) => {
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
            if(value.type === 'number') {
              if(value?.value) {
                const num = Number.parseInt(value?.value, 10);
                if (!isNaN(num)) {
                  postParams[name] = num
                }
              }
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
      dispatch(FETCHING("call", true));
      const { data: { rings , totalItems }} = await http.post(baseUrl + "/currentCalls", {
        ...postParams
      });
      const items = rings.map((item) => ({
        ...item,
        start: moment(item.start).format("YYYY-MM-DD HH:mm"),
        endX3: moment(item.endX3).format("YYYY-MM-DD HH:mm"),
        endX2: moment(item.endX2).format("YYYY-MM-DD HH:mm")
      }));
      dispatch(SET(Types.SET_CALL, {
        rings: items,
        total: totalItems
      }));
    } catch (err) {
      dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит поточних дзвінків")));
    } finally {
      dispatch(FETCHING("call", false));
    }
  };
};

// export const GET_CALL = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(FETCHING("call", true));
//       const {data} = await http.get(baseUrl + "/currentCalls");
//       const rings = data.map((item) => ({
//         ...item,
//         start: moment(item.start).format("YYYY-MM-DD HH:mm"),
//         endX3: moment(item.endX3).format("YYYY-MM-DD HH:mm"),
//         endX2: moment(item.endX2).format("YYYY-MM-DD HH:mm")
//       }));
//
//       dispatch(SET(Types.SET_CALL, rings));
//     } catch (err) {
//       dispatch(SET_ERROR(GET_ERROR_STRUCTURE(err, "Запит поточних дзвінків")));
//     } finally {
//       dispatch(FETCHING("call", false));
//     }
//   };
// };

// export const filterRight = (filterList) => ({type: Types.FILTER_CURRENT_CALLS, filterList});
