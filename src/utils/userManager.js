import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
	client_id: process.env.CLIENT_ID,
	redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback/`,
	response_type: process.env.RESPONSE_TYPE,
	scope: process.env.SCOPE,
	automaticSilentRenew: true,
	filterProtocolClaims: true,
	loadUserInfo: true,
	authority: process.env.AUTHORITY,
	post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${
		window.location.port ? `:${window.location.port}` : ''
	}/logout/`
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
