import React from "react";
import {IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Grid
} from "@material-ui/core";
import LogComponent from "@components/LogComponent";

const InfoCommutator = ({commutator, isOpen, onClose }) => {
	return (
		<Dialog
			open={isOpen}
			fullWidth
			maxWidth="lg"
			onClose={onClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle>
				<Grid container justify="flex-end" spacing={1}>
				<IconButton aria-label="close" onClick={onClose} size="small">
					<CloseIcon fontSize="inherit" />
				</IconButton>
				</Grid>
			</DialogTitle>
      <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <LogComponent notSticky label="x1" data={commutator.lastX1CommandsX1Answers}/>
            </Grid>
            <Grid item xs={12}>
              <LogComponent notSticky label="x2" data={commutator.lastX2Messages}/>
            </Grid>
          </Grid>
      </DialogContent>
		</Dialog>
	);
};

export default InfoCommutator;
