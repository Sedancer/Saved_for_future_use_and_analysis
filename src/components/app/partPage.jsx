import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import {find} from "lodash";
import {createStyles, withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {ListItem, ListItemText, ListItemIcon} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Person, ExitToApp} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DomainIcon from '@material-ui/icons/Domain';
import PeopleIcon from '@material-ui/icons/People';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import SettingsIcon from '@material-ui/icons/Settings';
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined';
import DeveloperBoardOutlinedIcon from '@material-ui/icons/DeveloperBoardOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';

import {ModalsHOC} from "@/HOC";
import getDataHOC from "@/HOC/getAllData";
import getVendorName from "@views/productName";
import {useDispatch} from "react-redux";
import {LOAD_SELECTS} from "@redux/library/actions";

const links = [
	{
		path: "/",
		claim: "Ovops",
		label: "Головна",
		icon: DomainIcon
	},
	{
		path: "/users",
		claim: "Users",
		label: "Користувачі",
		icon: PeopleIcon
	},
	{
		path: "/commutators",
		claim: "Ovops",
		label: "ОВОП",
		icon: DeveloperBoardOutlinedIcon
	},
	{
		path: "/hiChannels",
		claim: "HiChannels",
		label: "Канали HI",
		icon: AccountTreeOutlinedIcon
	},
	{
		path: "/sync",
		claim: "Synchronizations",
		label: "Аудит та Синхронізація",
		icon: SyncProblemIcon
	},
	{
		path: "/alarms",
		claim: "Alarms",
		label: "Аварії",
		icon: ReportProblemIcon
	},
	{
		path: "/objects",
		claim: "Targets",
		label: "Об'єкти",
		icon: RecentActorsOutlinedIcon
	},
	{
		path: "/ring",
		claim: "CurrentCalls",
		label: "Поточні дзвінки",
		icon: PhoneCallbackIcon
	},
	{
		path: "/settings",
		claim: null,
		label: "Налаштування",
		icon: SettingsIcon
	},
];

const styles = () =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		grow: {
			flexGrow: 1,
		},
		button: {
			margin: 10,
			'& svg': {
				marginRight: 5
			}
		},
		user: {
			display: "flex",
			color: "#fff",
			marginRight: 20,
			alignItems: "flex-end",
			textTransform: "uppercase",
			'& svg': {
				marginRight: 5
			}
		},
		header: {
			background: "#424242",
			position: "fixed"
		},
		vendorName: {
			color: "#fff",
			paddingRight: 10,
			marginRight: 10,
			display: "inline-block",
			borderRight: '1px solid currentColor',
			minWidth: 180
		},
		pageName: {
			color: "#fff",
			fontSize: 14
		},
		menuButton: {
			marginLeft: '-20px',
			marginRight: 20,
			position: "relative",
			width: 40,
			height: 40,
			'&:hover::before': {
				content: '""',
				display: "block",
				width: 40,
				height: 40,
				borderRadius: '50%',
				background: "rgba(255, 255, 255, 0.08)",
				transition: '.25s ease-in-out',
			},
			'& span': {
				display: 'block',
				position: 'absolute',
				height: '2px',
				width: '20px',
				background: "#fff",
				borderRadius: '2px',
				opacity: 1,
				left: '10px',
				transform: 'rotate(0deg)',
				transition: '.25s ease-in-out',
				'&:nth-child(1)': {
					top: 14
				},
				'&:nth-child(2)': {
					top: 20
				},
				'&:nth-child(3)': {
					top: 20
				},
				'&:nth-child(4)': {
					top: 26
				},
			},

		},
		menuButtonActive: {
			'& span': {
				'&:nth-child(1)': {
					top: 20,
					width: '0%',
					left: '50%',
				},
				'&:nth-child(2)': {
					transform: 'rotate(45deg)'
				},
				'&:nth-child(3)': {
					transform: 'rotate(-45deg)'
				},
				'&:nth-child(4)': {
					top: 20,
					width: '0%',
					left: '50%'
				},
			},
		},
		menuItemWrap: {
			padding: 0,
			margin: 0,
			display: "block",
		},
		menuItem: {
			display: "flex",
			height: "52px",
			alignItems: "center",
			textDecoration: "none",
			color: "#fff",
			padding: '10px 0 10px 8px',
			borderLeft: '4px solid #212121',
		},
		menuItemActive: {
			color: "#90caf9",
			borderLeft: '4px solid #3f669f',
			backgroundColor: "#343434",
		},
		menuItemIcon: {
			color: "currentColor",
			display: "flex",
			alignItems: "center",
			minWidth: "35px"
		},
		menuItemText: {
			transformOrigin: '0 0',
			opacity: 0,
			position: "relative",
			transition: 'all 200ms',
			transform: 'rotate(45deg)',
			minWidth: 194,

		},
		menuItemTextActive: {
			opacity: 1,
			transform: 'rotate(0deg)',
			transition: 'all 200ms',
			minWidth: 194,
		},
		drawer: {
			width: '45px',
			position: 'fixed',
			left: 0,
			top: '60px',
			zIndex: 2,
			background: "#424242",
			height: '100%',
			overflow: "hidden",
			transition: 'width 200ms',
			'&::after': {
				display: "block",
				content: "''",
				width: 4,
				height: '100%',
				position: "absolute",
				backgroundColor: "#212121",
				top: 0,
				left: 0,
				bottom: 0,
				zIndex: '-1',
			},
		},
		drawerShift: {
			transition: 'width 200ms',
			width: '240px'
		}

	});

function PartPage(props) {
	const dispatch = useDispatch();
	const {
		classes,
		loading,
		login,
		logout,
		rules,
		isOpen,
		setIsOpen
	} = props;
  const { t } = useTranslation(['dictionary']);
	useEffect(() => dispatch(LOAD_SELECTS()), [dispatch]);

	const active = props.history.location.pathname;
	const vendorName = getVendorName();
	const getPageName = () => {
		const {label = "Головна"} = find(links, ({path}) => path === active) || {};
		return t(label)
	};

	return (
		<div className={classes.root}>
			<Helmet>
				<title>{`${getVendorName()} ${getPageName()} `}</title>
			</Helmet>
			<div className={clsx(classes.drawer, {
				[classes.drawerShift]: isOpen,
			})}
			>
				{links
					.filter((el) => (el.claim && rules.includes(el.claim)) || !el.claim)
					.map(({label, path, icon: Icon}) => (
						<ListItem button key={label} className={classes.menuItemWrap}>
							<NavLink
								to={path}
								className={clsx(classes.menuItem, {
									[classes.menuItemActive]: path === active,
								})}
							>
								<ListItemIcon className={classes.menuItemIcon}>{<Icon/>}</ListItemIcon>
								<ListItemText
									className={clsx(classes.menuItemText, {
										[classes.menuItemTextActive]: isOpen,
									})}
									primary={t(label)}
								/>
							</NavLink>
						</ListItem>
					))}
			</div>
			<AppBar position="static" className={classes.header}>
				<Toolbar variant="dense">
					<div className={clsx(classes.menuButton, {
						[classes.menuButtonActive]: isOpen,
					})}
							 aria-label="menu"
							 onClick={() => setIsOpen(!isOpen)}>
						<span/>
						<span/>
						<span/>
						<span/>
					</div>
					<Typography variant="h6">
						<span className={classes.vendorName}>{vendorName}</span>
						<span className={classes.pageName}>{getPageName()}</span>
					</Typography>
					<div className={classes.grow}/>
					<div size="small" className={classes.user}>
						<Person/>
						{login}
					</div>
					<Button size="small" variant="outlined" onClick={() => logout()} className={classes.button}>
						<ExitToApp/>
            {t('вихід')}
					</Button>
				</Toolbar>
				{loading && <LinearProgress variant="indeterminate" color="secondary"/>}
			</AppBar>
		</div>
	);
}

PartPage.propTypes = {
	classes: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
}

export default withStyles(styles)(getDataHOC(ModalsHOC(PartPage)));
