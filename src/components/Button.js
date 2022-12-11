import React from "react";
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	btn : {
		"& svg": {
			marginRight: 5
		}
	}
});

const Btn = props => {
	const classes = useStyles();
	const { children, ...prp } = props;
	return (
		<Button variant="outlined" className={classes.btn} {...prp} >
			{children && children}
		</Button>
	);
};

export default Btn;
