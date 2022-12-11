import React, { Component } from "react";
import MyComponent from "./auth";
import { connect } from "react-redux";
import { ON_LOGIN } from "@/store/users/actions";

class AuthHOC extends Component {
    render() {
        return <MyComponent {...this.props} />;
    }
}
const mapState = (state) => ({
    isError: state.users.isAuthError,
    loading: state.users.fetching.login,
});

const mapDispatch = (dispatch) => ({
    onLogin: (DTO) => dispatch(ON_LOGIN(DTO)),
});
export default connect(mapState, mapDispatch)(AuthHOC);
