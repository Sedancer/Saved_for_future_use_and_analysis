import React, {Component, Suspense, lazy} from "react";
import {Route, Switch} from "react-router-dom";
import {Grid, Paper} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import PartPage from "@/components/app/partPage";
import ErrorModal from "@components/errorModal";
import {DataHOC, ModalsHOC} from "@/HOC";
import Loader from '@components/Loader';
import "./App.css";
import theme from './theme';

const Main = lazy( ()=> import("@pages/main"));
const Admin = lazy( ()=> import("@pages/admin"));
const Users = lazy( ()=> import("@pages/users"));
const Alarms = lazy( ()=> import("@pages/alarms"));
const Targets = lazy( ()=> import("@pages/targets"));
const HiChannels = lazy( ()=> import("@pages/hiChannels"));
const Ring = lazy( ()=> import("@pages/ring"));
const Audit = lazy( ()=> import("@pages/audit"));
const Commutators = lazy( ()=> import("@pages/commutators"));

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			isOpen: false,
			hasError: false,
		};
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({...this.state, hasError: true});
		// You can also log the error to an error reporting service
	}

	setIsOpen = () => {
		const {isOpen} = this.state;
		this.setState({...this.state, isOpen: !isOpen});
	};

	render() {
		const {rules} = this.props;
		const {isOpen} = this.state;
		let mainClassName = 'main';
		if (isOpen) mainClassName += ' main-is-open';
		const addition = {
			isOpen: isOpen,
			setIsOpen: this.setIsOpen
		};

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<div className="App">
					<header className="header">
						<PartPage
							{...this.props}
							{...addition}
						/>
					</header>
					<main className={mainClassName}>
						<Grid style={{height: "100%"}} container>
							<Grid item xs={12} container>
								<Grid item xs={12}>
									<Paper square style={{padding: 20, minHeight: "100%"}} elevation={0}>
										<Suspense fallback={<Loader />}>
											<Switch>
												<Route exact path="/" render={() => <Main/>}/>
												{rules.includes("Users") && (
													<Route exact path="/users" render={() => <Users/>}/>
												)}
												{rules.includes("Synchronizations") && (
													<Route exact path="/sync" render={() => <Audit/>}/>
												)}
												{rules.includes("Alarms") && (
													<Route exact path="/alarms" render={() => <Alarms/>}/>
												)}
												{rules.includes("Targets") && (
													<Route exact path="/objects" render={() => <Targets/>}/>
												)}
												{rules.includes("CurrentCalls") && (
													<Route exact path="/ring" render={() => <Ring/>}/>
												)}
												{rules.includes("HiChannels") && (
													<Route exact path="/hiChannels" render={() => <HiChannels/>}/>
												)}
												{rules.includes("Ovops") && (
													<Route exact path="/commutators" render={() => <Commutators/>}/>
												)}
												<Route exact path="/settings" render={() => <Admin/>}/>
											</Switch>
										</Suspense>
									</Paper>
								</Grid>
							</Grid>
						</Grid>
						<ErrorModal/>
					</main>
				</div>
			</ThemeProvider>
		);
	}
}

export default DataHOC(ModalsHOC(App));
