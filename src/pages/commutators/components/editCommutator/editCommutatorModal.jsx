import React from "react";
import { Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import Form from "./editCommutatorForm";
import {useDispatch} from "react-redux";
import {EDIT_COMMUTATOR} from "@redux/commutators/actions";

const EditCommutator = ({ isOpen, onClose, commutator }) => {
	const dispatch = useDispatch();
	const editCommutator = commutator => dispatch(EDIT_COMMUTATOR(commutator));
    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth="xl"
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Редагувати ОВОП: {commutator.ovopName}</DialogTitle>
            <DialogContent>
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Form onSubmit={editCommutator} commutator={commutator} onClose={onClose} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default EditCommutator;
