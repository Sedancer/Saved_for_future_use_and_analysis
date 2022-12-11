import React from "react";
import { Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import Form from "./addCommutatorForm";
import { useDispatch } from "react-redux";
import {ADD_COMMUTATOR} from "@redux/commutators/actions";

const AddCommutator = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const addCommutator = commutator => dispatch(ADD_COMMUTATOR(commutator));
    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth="xl"
            //   onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Додати ОВОП</DialogTitle>
            <DialogContent>
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Form onSubmit={addCommutator} onClose={onClose} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default AddCommutator;
