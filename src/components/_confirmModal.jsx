import React, { useState } from "react";
import { Dialog, DialogContent, TextField, Grid, Typography, DialogTitle, Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";

export const _confirmModal = ({ isOpen, title, message, onCancel, desc, onSubmit }) => {
  const [description, setDescription] = useState("");
  const handleChange = ({ target: { value } }) => {
    setDescription(value);
  };

  return (
    <Dialog onClose={onCancel} open={isOpen} maxWidth={"sm"} fullWidth aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">
        <Typography variant="h5">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>{message}</Grid>
        {desc !== false && (
          <Grid item xs={12}>
            <TextField label="Опис" InputLabelProps={{ shrink: true }} multiline rows="4" value={description} fullWidth variant="outlined" onChange={handleChange} margin="normal" />
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>скасувати</Button>
        <Button onClick={() => onSubmit(description)}>підтвердити</Button>
      </DialogActions>
    </Dialog>
  );
};
