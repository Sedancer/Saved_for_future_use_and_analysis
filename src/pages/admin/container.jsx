import React, { Component } from "react";
import MyComponent from "./admin";
import { connect } from "react-redux";
import { SET_LOG, SET_MODE, GET_LOG_LEVEL, GET_MODE } from "@/store/admin/actions";

class AdminHOC extends Component{
  componentDidMount() {
    this.props.getLogLevel();
    this.props.getMode();
  }
  render() {
    return <MyComponent {...this.props} />;
  }
}
const mapState = (state) => ({
  logLevel: state.admin.log,
  mode: state.admin.mode,
});

const mapDispatch = (dispatch) => ({
  onUpdateLog: (logLevel) => dispatch(SET_LOG(logLevel)),
  onUpdateMode: (mode) => dispatch(SET_MODE(mode)),
  getLogLevel: () => dispatch(GET_LOG_LEVEL()),
  getMode: () => dispatch(GET_MODE()),
});
export default connect(mapState, mapDispatch)(AdminHOC);
