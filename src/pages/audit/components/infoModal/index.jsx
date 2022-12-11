import React, {useState, useEffect} from "react";
import {Dialog, DialogContent, CircularProgress, DialogTitle, Grid} from "@material-ui/core";

import Table from "@views/table";
import Filters from "@views/filters/filters";
import WrapTablePage from "@views/wrapTablePage/wrapTablePage";

import {TableHOC} from "@/HOC";
import {useDispatch, useSelector} from "react-redux";
import {filterCurrent} from "@redux/audit/actions";
import {renderDateTime} from "@/utils/renderDateTime"

const TableWithSettings = TableHOC(Table, "syncTargets");

const InfoSync = ({isOpen, loading, onClose}) => {
	const dispatch = useDispatch();
	const {
		tableData = [],
		currentInfo: { periodInDays = "", ovopName = ""} = {}
	} = useSelector((state) => state.sync) || {};
	const [data, getData] = useState();

	useEffect(() => {
		if (loading) return;
		getData(tableData)
	}, [loading, tableData]);


	const [filterList, getFiltersFields] = useState([]);

	useEffect(() => {
		dispatch(filterCurrent(filterList));
	}, [filterList, getFiltersFields, dispatch])


	useEffect(() => {
		// if (!d) return;
		// if (!filters) {
		// 	setFiltersData(d.tableData);
		// 	return;
		// }
		//
		// const fd = d.tableData.filter(({targetId, identityType, identityValue, auditResult, syncResult}) => {
		// 	let ok = true;
		// 	if (filters.targetId && !targetId.includes(filters.targetId)) ok = false;
		// 	if (filters.identityType && identityType.toLowerCase() !== filters.identityType.toLowerCase()) ok = false;
		// 	if (filters.identityValue && !identityValue.toLowerCase().includes(filters.identityValue.toLowerCase())) ok = false;
		// 	if (filters.auditResult && auditResult.toLowerCase() !== filters.auditResult.toLowerCase()) ok = false;
		// 	if (filters.syncResult && syncResult.toLowerCase() !== filters.syncResult) ok = false;
		// 	return ok;
		// });
		// setFiltersData(fd);
	}, []);

	// console.log('loading', loading);
	// console.log('data', data);

	if (loading) {
		return (
			<Dialog
				open={isOpen}
				fullWidth
				maxWidth="xl"
				onClose={onClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{}</DialogTitle>
				<DialogContent style={{textAlign: "center"}}>
					<CircularProgress/>
				</DialogContent>
			</Dialog>
		);
	}


	return (
		<Dialog
			open={isOpen}
			fullWidth
			maxWidth="xl"
			onClose={onClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle id="alert-dialog-slide-title">
				{`Інформація за результатами завдання 
					${periodInDays > 0 ? 'останньої' : 'одноразової'} синхронізації 
					${ovopName} вiд ${renderDateTime(data.date)}`
				}
			</DialogTitle>
			<DialogContent style={{textAlign: "center", minHeight: 200}}>
				<Grid container alignItems="center" justify="center" spacing={1}>
					<Grid item xs={12}>
						<WrapTablePage
							table={<TableWithSettings data={data}/>}
							filters={<Filters name="auditInfo" getFiltersFields={getFiltersFields}/>}
						/>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

export default InfoSync;
