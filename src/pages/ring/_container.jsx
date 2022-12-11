import React, { Component } from "react";
import MyComponent from "./ring";
import { connect } from "react-redux";
import moment from "moment";
import { GET_CALL } from "@/store/rings/actions";

class HiChannelsHOC extends Component{
    render() {
        return <MyComponent {...this.props} />;
    }
}
const mapState = (state) => {
    const commutators = state.commutators.commutators;
    const rings = state.rings.rings;
    return {
        ovops: commutators,
        rings: rings.map((r) => ({
            ...r,
            start: moment(r.start).format("YYYY-MM-DD HH:mm"),
            endX3: moment(r.endX3).format("YYYY-MM-DD HH:mm"),
            endX2: moment(r.endX2).format("YYYY-MM-DD HH:mm"),

            ovop: commutators.find((c) => c.neId === r.neId) ? commutators.find((c) => c.neId === r.neId).ovopName : "",
        })),
    };
};

const mapDispatch = (dispatch) => ({
    update: () => dispatch(GET_CALL()),
});
export default connect(mapState, mapDispatch)(HiChannelsHOC);
