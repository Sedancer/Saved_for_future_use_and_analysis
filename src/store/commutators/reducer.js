import Types from "./actionType";
import {cloneDeep, isEmpty} from "lodash";
import filterDataFromField from "@/utils/filterDataFromField";

const initialState = {
  start: [],
  commutators: [],
  current: null,
  statuses: [],
  full: [],
	filterList: [],
  mainInfo: null,
  dopInfo: null,
  fetching: {},
  openAllCommutators: false,
  openedListCommutators: []
};
const openedAll = (data, isOpen) => {
 if( isEmpty(!data) ){
      return data.map(
        item => ({
          ...item,
          isCollapsible: isOpen
        })
      )
  } else {
   return []
 }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_COMMUTATORS:
      return cloneDeep({
        ...state,
        commutators: action.payload,
      });
    case Types.SET_COMMUTATORS_STATUS:
      return cloneDeep({...state, statuses: action.payload});
    case Types.SET_DOP_INFO:
      return cloneDeep({...state, dopInfo: action.payload});
    case Types.FULL_COMMUTATOR_INFO:
      return cloneDeep({...state,
				start: action.payload,
				full: filterDataFromField(action.payload, state.filterList)
      });
		case Types.FILTER_COMMUTATORS:
			return cloneDeep({
				...state,
				full: filterDataFromField(state.start, action.filterList)
			});
    case Types.OPEN_ALL_COMMUTATORS:
      const { isOpen } = action;
      if(!isOpen){
        return cloneDeep({
          ...state,
          openedListCommutators: [],
        });
      }
      return cloneDeep({
        ...state,
        openedListCommutators: state.full.map(({ovopName}) => ovopName),
      });

    case Types.CHANGE_OPEN_COMMUTATOR:
      const { name } = action;
      const isIncludes= state.openedListCommutators.includes(name);
      if(isIncludes){
        return cloneDeep({
          ...state,
          openedListCommutators: state.openedListCommutators.filter((item)=>(item !== name)),
        });
      }
      return cloneDeep({
        ...state,
        openedListCommutators: [...state.openedListCommutators, name]
      });

    case Types.SET_COMMUTATOR_CURRENT:
      return cloneDeep({...state, current: action.payload});
    case Types.MAIN_INFO:
      return cloneDeep({...state, mainInfo: action.payload});

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
