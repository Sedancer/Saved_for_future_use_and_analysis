import React, { StrictMode } from "react";
import { render } from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import { OidcProvider } from "redux-oidc";
import App from "./components/app/index";
import Callback from "./views/callback";
import Logout from "./views/logout";
import userManager from "./utils/userManager";
import store from "./store";
import AuthHOC from "./HOC/auth";
import reportWebVitals from './reportWebVitals';
import './i18n';
import './index.css';
const history = createBrowserHistory();
const PrivateApp = AuthHOC(App);

render(
  <StrictMode>
    <Provider store={store}>
      <OidcProvider userManager={userManager} store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/callback/" component={Callback} />
            <Route path="/signout/" component={Logout} />
            <Route path="/" component={PrivateApp} />
          </Switch>
        </Router>
      </OidcProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
