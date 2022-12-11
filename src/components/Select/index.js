import React from "react";
import {TextField} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useSelector} from "react-redux";
import {isEmpty} from "lodash";

const useStyles = makeStyles({
	root: {
		width: "100%"
	}
});

const Select = (props) => {
	const { commutators } = useSelector((state) => state.commutators);
	const {selects} = useSelector((state) => state.library);
	const classes = useStyles();

	if( isEmpty(selects) )return null;

	const {
		value = null,
		name,
		title,
		onChange,
		type,
		inputProps,
		...others
	} = props;

	const createOptionsObj = (item) => ({label: item, value: item});

	let options = [];
	if (name === 'commandMode') options = selects?.commandsModes?.map(createOptionsObj);
	if (name === 'softwareVersion') options = selects?.ovopSoftwareVersions?.map(createOptionsObj);
	if (name === 'subsystemType') options = selects?.ovopSubsystemTypes?.map(createOptionsObj);
	if (name === 'alarmType') options = selects?.alarm?.map(createOptionsObj);
	if (name === 'criticalityType') options = selects?.criticalityTypes?.map(createOptionsObj);
	if (name === 'auditOperationResult') options = selects?.auditResultTypes?.map(createOptionsObj);
	if (name === 'syncResult') options = selects?.synchronizationTypes?.map(createOptionsObj);
	if (name === 'identityType') options = selects?.identityTypes?.map(createOptionsObj);
	if (name === 'category') options = selects?.targetCategories?.map(createOptionsObj);
	if (name === 'type') options = selects?.ovopTypes?.map(createOptionsObj);
	if (name === 'serilogConcealModes') options = selects?.serilogConcealModes?.map(createOptionsObj);
	if (name === 'serilogMinimumLevels') options = selects?.serilogMinimumLevels?.map(createOptionsObj);
	if (name === 'rules') options = selects?.rules?.map(createOptionsObj);
	if (name === 'audit') options = selects?.audit?.map(createOptionsObj);
	if (name === 'ovopId') {
		options = (!isEmpty(commutators)) ? commutators.map((o) => ({label: o.ovopName, value: o.ovopId})) : [];
	}
	if (name === 'ovopName') {
		options = (!isEmpty(commutators)) ? commutators.map((o) => ({label: o.ovopName, value: o.ovopName})) : [];
	}
	if (name === "status" ) {
		options = [
			{value: "allXRight", label: "Усі Х Активні"},
			{value: "errorOnly", label: "Аварії"}
		]
	}

	return (
		<Autocomplete
			className={classes.root}
			options={options}
			classes={{option: classes.option}}
			autoHighlight
			value={value}
			getOptionLabel={(option) => (typeof option === "string") ? option : option.label}
			getOptionSelected={(option, value) => value.value === option.value}
			renderOption={(option) => option.label }
			renderInput={(params) => (
				<TextField
					{...params}
					value={value}
					label={title}
					variant="outlined"
					margin="dense"
					{...inputProps}
					inputProps={{
						...params.inputProps
					}}
				/>
			)}
			onChange={(event, v) => onChange(v)}
			{...others}
		/>
	)
};

export default Select;
