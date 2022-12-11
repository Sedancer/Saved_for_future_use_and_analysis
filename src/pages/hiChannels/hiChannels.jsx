import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import LogComponent from "@components/LogComponent";
import Loader from "@components/Loader";
import {useDispatch, useSelector} from "react-redux";
import { GET_HI_STATUSES } from "@redux/hiChannels/actions";


const HiChannels = () => {
	const dispatch = useDispatch();
	const {isLoadingHiStatuses, isLoadedHiStatuses, hiStatuses} = useSelector((state) => state.hi);

	useEffect(() => {
		dispatch(GET_HI_STATUSES());
		const interval = setInterval(() => {
			dispatch(GET_HI_STATUSES());
		}, 600000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	if (isLoadingHiStatuses && !isLoadedHiStatuses ) return <Loader />;

	const {
		lastHi1CommandsHi1Answers = [],
		lastHi1MessagesHi1Acks = [],
		lastHi2Messages = [],
		lastHi3Messages = []
	} = hiStatuses || {};

	const list = [
		{
			label: "Last Hi1 Commands and Hi1 Answers",
			data: lastHi1CommandsHi1Answers
		},
		{
			label: "Last Hi1 Messages and Hi1 Acks",
			data: lastHi1MessagesHi1Acks
		},
		{
			label: "Last Hi2 Messages",
			data: lastHi2Messages
		},
	]
	return (
		<Grid container spacing={3}>
			{list.map(
				({label, data}) => <Grid key={label} item xs={12}><LogComponent label={label} data={data}/></Grid>
			)}
		</Grid>
	)
};

export default HiChannels;
