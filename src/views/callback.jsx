import React, {Component} from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
// import { RouteComponentProps } from "react-router-dom";
import userManager from "../utils/userManager";

class CallbackPage extends Component {
  componentDidMount() {}
  render() {
    // just redirect to '/' in both cases
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={(user) => this.props.history.push("/")}
        errorCallback={error => alert(error)}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(CallbackPage);
