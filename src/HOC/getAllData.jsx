import React from "react";
import { connect } from "react-redux";
import { DICTIONARY_FETCH } from "@redux/dictionaries/actions";
import { LOGOUT } from "@/store/users/actions";

export default function getDataHOC(Component) {
    class GetData extends React.Component {
        render() {
            return <Component {...this.props}  />;
        }
    }
    const mapStateToProps = (state) => ({
        rules: state.users.claims,
        login: state.users.login,
    });

    const mapDispatchToProps = (dispatch) => ({
        dictionaries: (type) => dispatch(DICTIONARY_FETCH(type)),
        logout: () => dispatch(LOGOUT()),
    });

    return connect(mapStateToProps, mapDispatchToProps)(GetData);
}
