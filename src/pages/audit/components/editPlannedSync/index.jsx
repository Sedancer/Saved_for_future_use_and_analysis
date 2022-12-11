import React from "react";
import { Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";

import Form from "./form";

const EditSyncModal = ({ onSubmit, isOpen, onClose, ...props }) => {
  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Редагувати аудит</DialogTitle>
      <DialogContent>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12}>
            <Form onSubmit={onSubmit} {...props} onClose={onClose} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EditSyncModal;
