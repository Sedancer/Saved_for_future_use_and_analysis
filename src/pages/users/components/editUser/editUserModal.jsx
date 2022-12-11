import React, { useState } from "react";
import {useTranslation} from "react-i18next";
import { Dialog, DialogContent, DialogTitle, Grid, Button } from "@material-ui/core";
import { UserInfo, EditRules, EditPassword } from "./components";

const EditUser = ({ onEditRules, editUserPassword, user, isOpen, onClose }) => {
    const { t } = useTranslation('users');
    const [isEditRules, setIsEditRules] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);
    const onEditRulesSubmit = (roles, description) => {
        const DTO = {
            roles,
            description,
            userId: user.userId,
        };
        onEditRules(DTO);
        setIsEditRules(false);
    };
    const onEditPassword = (password) => {
        const DTO = {
            userId: user.userId,
            login: user.login,
            password,
        };
        editUserPassword(DTO);
        setIsEditPassword(false);
    };
    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                <Grid container>
                    <Grid item xs={6}>
                      {t('Редагувати користувача')}
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "right " }}>
                        <Button variant="outlined" size="small" style={{ margin: 2 }} onClick={() => setIsEditRules(true)}>
                          {t('Права та опис')}
                        </Button>
                        <Button variant="outlined" size="small" style={{ margin: 2 }} onClick={() => setIsEditPassword(true)}>
                          {t('Пароль')}
                        </Button>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container alignItems="center" spacing={2} style={{ padding: 5 }} justify="center">
                    <Grid item xs={12}>
                        <UserInfo {...user} />
                        <EditRules
                            description={user.description}
                            login={user.login}
                            roles={user.roles}
                            isOpen={isEditRules}
                            onClose={() => setIsEditRules(false)}
                            onSubmit={onEditRulesSubmit}
                        />
                        <EditPassword
                            login={user.login}
                            isOpen={isEditPassword}
                            onClose={() => setIsEditPassword(false)}
                            onSubmit={onEditPassword}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default EditUser;
