import React, { Component } from "react";
import MyComponent from "./users";
import { connect } from "react-redux";
import { ADD_USER, EDIT_USER, CHECK_USERNAME, A_CHTO_TAK_MOJNO_CHTOLI, DELETE_USER } from "@/store/users/actions";

class UsersHOC extends Component{
    render() {
        return <MyComponent {...this.props} />;
    }
}
const mapState = (state) => ({
    users: state.users.users,
    isLoadCheck: state.users.fetching.checkUserName,
    isLoginFree: state.users.isLoginFree,
});

const mapDispatch = (dispatch) => ({
    addUser: (newUser) => dispatch(ADD_USER(newUser)),
    check: (name) => dispatch(CHECK_USERNAME(name)),
    editUser: (editUser) => dispatch(EDIT_USER(editUser)),
    deleteUser: (userId) => dispatch(DELETE_USER(userId)),
    editUserPassword: (DTO) => dispatch(A_CHTO_TAK_MOJNO_CHTOLI(DTO)),
});
export default connect(mapState, mapDispatch)(UsersHOC);
