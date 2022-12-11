import Types from "./actionType";
import { cloneDeep } from "lodash";
import filterDataFromField from "@/utils/filterDataFromField";

const initialState = {
  syncs: null,
	startOne: [],
	startPeriod: [],
	startPlanned: [],
  one: [],
  period: [],
  planned: [],
	filterList: [],
	startTableData : [],
	tableData : [],
	filterListCurrentInfo: null,
  currentInfo: null,
  fetching: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_SYNC:
    	const { one , period, planned } = action.payload;
      return cloneDeep({
        ...state,
        syncs: action.payload,
        one: filterDataFromField(one, state.filterList),
				period: filterDataFromField(period, state.filterList),
				planned: filterDataFromField(planned, state.filterList),
				startOne: one,
				startPeriod: period,
				startPlanned: planned,
      });

    case Types.FILTER_ONE:
      return cloneDeep({
        ...state,
				filterList: action.filterList,
        one: filterDataFromField(state.startOne, action.filterList)
      });

    case Types.FILTER_PERIOD:
      return cloneDeep({
        ...state,
				filterList: action.filterList,
        period: filterDataFromField(state.startPeriod, action.filterList)
      });

    case Types.FILTER_PLANNED:
      return cloneDeep({
        ...state,
				filterList: action.filterList,
        planned: filterDataFromField(state.startPlanned, action.filterList)
      });

    case Types.FETCHING:
      return cloneDeep({
        ...state,
        fetching: {
          ...state.fetching,
          [action.payload.req]: action.payload.value,
        },
      });
    case Types.CURRENT_SYNC_INFO:
      return cloneDeep({
        ...state,
				startTableData: action.payload.tableData,
				tableData: action.payload.tableData,
        currentInfo: action.payload,
      });

		case Types.FILTER_CURRENT_INFO:
			return cloneDeep({
				...state,
				filterListCurrentInfo: action.filterListCurrentInfo,
				tableData: filterDataFromField(state.startTableData, action.filterListCurrentInfo)
			});
    case Types.DELETE_ALL_IMMEDIATE:
      return cloneDeep({
        ...state,
        one: [],
      });
    case Types.DELETE_ALL_PERIODIC:
      return cloneDeep({
        ...state,
        period: [],
      });
    case Types.DELETE_ALL_SCHEDULED:
      return cloneDeep({
        ...state,
        planned: [],
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
