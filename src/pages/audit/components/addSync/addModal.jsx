import React from "react";
import {useTranslation} from "react-i18next";
import {Dialog, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import Form from "./addForm";

const AddSync = ({onSubmit, isOpen, onClose, ...props}) => {
  const {t} = useTranslation('audit');
  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{t("Додати аудит")}</DialogTitle>
      <DialogContent>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12}>
            <Form onSubmit={onSubmit} onSubmitNow={props.onSubmitNow} onClose={onClose}/>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddSync;
