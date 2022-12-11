import axios from "axios";
import store from "./../store";
import { LOGOUT } from "@redux/users/actions";
const requests = axios.create();

requests.interceptors.request.use((config) => {
    // Do something before request is sent
    const state = store.getState();

    config.headers["Authorization"] = "Bearer " + state.users.token;

    return config;
}, null);

requests.interceptors.response.use(
    (response) => response,
    (err) => {
        // console.log(err);
        if (err.response.status === 401) store.dispatch(LOGOUT());
        return Promise.reject(err);
    }
);

export default requests;
