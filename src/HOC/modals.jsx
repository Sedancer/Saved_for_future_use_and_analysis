import React from "react";
import { connect } from "react-redux";
import { DELETE_ERROR } from "@redux/modals/actions";

export default function getModalsHOC(Component) {
    class GetModal extends React.Component {
        render() {
            return <Component {...this.props} />;
        }
    }
    const mapStateToProps = (state) => ({
        errors: state.modals.errors,
    });

    const mapDispatchToProps = (dispatch) => ({
        onError: (id) => dispatch(DELETE_ERROR(id)),
    });

    return connect(mapStateToProps, mapDispatchToProps)(GetModal);
}
