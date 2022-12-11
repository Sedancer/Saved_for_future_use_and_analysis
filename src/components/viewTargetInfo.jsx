import React, {Fragment} from 'react';
import { PersonPin } from '@material-ui/icons';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, Typography, DialogTitle, Grid } from '@material-ui/core';


const styles = (theme) =>
	createStyles({
		root: {
			width: '100%',
			marginTop: theme.spacing(1) * 3,
			overflowX: 'auto'
		},
		header: {
			color: theme.palette.secondary.main
		}
	});

const ViewTargetInfo = ({ isOpen, onCancel, target, classes }) => {
	if (!target) return <div />;
	return (
		<Dialog onClose={onCancel} open={isOpen} maxWidth={'lg'} fullWidth aria-labelledby="simple-dialog-title">
			<DialogTitle id="simple-dialog-title">
				<Grid container>
					<Grid item xs={1}>
						<PersonPin fontSize="large" />{' '}
					</Grid>
					<Grid item xs={11}>
						<Typography variant="h5">
							<span className={classes.header}>{target.name} </span> info
						</Typography>
					</Grid>
				</Grid>
			</DialogTitle>
			<DialogContent>
				<Grid container>
					{target.map(([prop, value]) => {
						return (
							<Fragment key={value}>
								<Grid item xs={8}>
									<Typography variant="h5">{prop}:</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography component="h6">{value}</Typography>
								</Grid>
							</Fragment>
						);
					})}
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

export default withStyles(styles)(ViewTargetInfo);
