import React from 'react';
import { connect } from 'react-redux';
import userManager from '../utils/userManager';

class CallbackPage extends React.Component {
	componentDidMount() {
		userManager.signoutRedirect();
	}
	render() {
		return <div>Redirecting...</div>;
	}
}
function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

export default connect(
	null,
	mapDispatchToProps
)(CallbackPage);
