import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Auth from "./../components/auth";
import {GET_LOGIN_DTO_FROM_STORAGE} from "@/store/users/actions";

export default function isAuthHOC(Component) {
	return function (props) {
		const dispatch = useDispatch();
		const {
			userId,
			loadingToken
		} = useSelector((state) => state.users);
		if (loadingToken) {
			dispatch(GET_LOGIN_DTO_FROM_STORAGE())
			return <div/>;
		} else if (userId) {
			return <Component {...props} />;
		} else {
			return <Auth/>;
		}
	}
}
