import React from "react";
import {useTranslation} from "react-i18next";
import { Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import Form from "./addUserForm";

const AddUser = ({ onSubmit, isOpen, check, onClose, ...props }) => {
  const { t } = useTranslation(['users', 'btn']);
    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth="md"
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{t('Додати користувача')}</DialogTitle>
            <DialogContent>
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Form {...props} onSubmit={onSubmit} onClose={onClose} check={check} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default AddUser;
