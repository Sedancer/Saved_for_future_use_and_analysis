import React, {useState, useEffect} from "react";
import {TableHOC} from "@/HOC";
import Table from "@views/table";
import Filters from "@views/filters/filters";
import WrapTablePage from "@views/wrapTablePage/wrapTablePage";
import {useDispatch, useSelector} from 'react-redux';
import {filterAlarms} from "@redux/alarms/actions"
import { GET_ALARMS } from "@/store/alarms/actions";
const TableWithSettings = TableHOC(Table, "alarms");

const Alarms = () => {
	const dispatch = useDispatch();
	const { alarms } = useSelector((state) => state.alarms);

	const [filterList, getFiltersFields] = useState([]);
	const [data, getData] = useState(alarms);

	useEffect(() => {
		dispatch(GET_ALARMS());
		const interval = setInterval(() => {
			dispatch(GET_ALARMS());
		}, 600000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	useEffect(() => {
		getData(alarms)
	}, [alarms])

	useEffect(() => {
		dispatch(filterAlarms(filterList));
	}, [filterList, getFiltersFields, dispatch])


	return (
		<WrapTablePage
			table={ <TableWithSettings data={data}/>}
			filters={ <Filters name="alarms" getFiltersFields={getFiltersFields}/> }
		/>
	);
};

export default Alarms;
