import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core";
import {
	Grid,
	IconButton,
	Divider,
	Dialog,
	DialogContent,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import Table from "@/views/table";
import TableHOC from "@/HOC/tableHOC";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {GET_TARGET_INFO} from "@redux/targets/actions";
import { isEmpty } from "lodash";

const TableWithSettings = TableHOC(Table, "targetInfo");

const useStyles = makeStyles((theme) =>
	({
		root: {
			width: "100%",
			marginTop: theme.spacing(1) * 3,
			overflowX: "auto",
		},
		header: {
			color: theme.palette.secondary.main,
		},
		closeButton: {
			position: "absolute",
			right: theme.spacing(1),
			top: theme.spacing(1)
		},
		progress: {
			margin: theme.spacing(1) * 2,
		}
	}));

const ObjectInfo = ({isOpen, onClose, properties}) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const {id, neId} = properties;
	const {target} = useSelector((state) => state.targets);
	useEffect(() => dispatch(GET_TARGET_INFO(id, neId)), []);
	if (isEmpty(target)) return null;

	const structure = [
		{
			title: 'Target Id',
			value: id
		}, {
			title: 'NE Id',
			value: neId
		}, {
			title: 'ОВОП',
			value: target.ovopName ? target.ovopName: "Не визначено"
		}, {
			title: 'Час активації',
			value: target.activationTime ? moment(target.activationTime).format("YYYY-MM-DD HH:mm") : ''
		}, {
			title: 'Час закінчення',
			value: target.endTime ? moment(target.endTime).format("YYYY-MM-DD HH:mm") : ''
		}, {
			title: 'Ознака',
			value: `${target.identityValue} (Тип: ${target.identityType}) ${target.numberSign}`
		}, {
			title: 'MSISDN',
			value: target.msisdn
		}, {
			title: 'IMSI',
			value: target.imsi
		}, {
			title: 'IMEI',
			value: target.imei
		}, {
			title: 'Режим',
			value: target.mode
		}, {
			title: 'Категорія',
			value: target.category
		}, {
			title: 'Пріоритет',
			value: target.priority
		}, {
			title: 'Повнота',
			value: target.fullIndicator
		}, {
			title: "Заборона зєднання",
			value: target?.barring ? "встановлено" : "не встановлено"
		},
	];

	const {locationsMcc: mcc, locationsMnc: mnc, locationsLac: lac, locationsCellId: cellId} = target;

	let tablesData = [];
	let maxLength = Math.max(mcc.length, mnc.length, lac.length, cellId.length);
	for (let i = 0; i < maxLength; i++) {
		tablesData.push({
			mcc: mcc[i] ? mcc[i] : null,
			mnc: mnc[i] ? mnc[i] : null,
			lac: lac[i] ? lac[i] : null,
			cellId: cellId[i] ? cellId[i] : null,
		});
	}

	return (
		<Dialog
			open={isOpen}
			fullWidth
			maxWidth="lg"
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="subtitle2" style={{textAlign: "center", fontSize: "1.2rem"}}>
							Інформація про об'єкт
						</Typography>
						<IconButton size="small" aria-label="close" className={classes.closeButton} onClick={onClose}>
							<Close/>
						</IconButton>
						<Divider/>
					</Grid>
					<Grid item xs={6}>
						<List dense>
							{structure.map(({title, value}) => (
								<ListItem key={value || title} style={{borderBottom: "1px dashed white"}}>
									<ListItemText primary={`${title} :`}/>
									<ListItemSecondaryAction>{value}</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
					</Grid>
					<Grid item xs={6}>
						<TableWithSettings data={tablesData}/>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};
export default ObjectInfo;
