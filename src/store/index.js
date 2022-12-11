import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { loadUser } from "redux-oidc";
import { routerReducer } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userManager from "../utils/userManager";

import commutators from "./commutators";
import alarms from "./alarms";
import hi from "./hiChannels";
import targets from "./targets";
import sync from "./audit";
import rings from "./rings";
import users from "./users";
import { dictionaries } from "./dictionaries";
import { modals } from "./modals";
import admin from "./admin";
import settings from "./settings";
import library from "./library";
const store = createStore(
  combineReducers({
    commutators,
    settings,
    targets,
    rings,
    users,
    hi,
    admin,
    dictionaries,
    sync,
    modals,
    alarms,
		library,
    routing: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

loadUser(store, userManager);

export default store;
