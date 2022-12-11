import React from "react";
import { Grid, TextField, Button, InputAdornment } from "@material-ui/core";
import { Formik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "moment/locale/uk";
import { POSSIBLE_CLAIMS } from "@/utils/claims";
const AddUserForm = (props) => {
    return (
        <Formik
            initialValues={{
                name: props.user.login,
                password: "",
                confirmPassword: "",
                rules: props.user.roles,
                possibleRules: POSSIBLE_CLAIMS().filter((claim) => !props.user.roles.includes(claim)),
                seePassword: false,
                description: "",
            }}
            onSubmit={(val, actions) => {
                actions.setSubmitting(true);
                props.onSubmit({
                    id: props.user.id,
                    login: props.user.login,
                    password: val.password,
                    roles: val.rules,
                    description: val.description,
                });
                props.onClose();
            }}
            validate={(values) => {
                let errors = {};
                for (let key in values) {
                    if (values.password !== values.confirmPassword) {
                        errors["password"] = "Паролі не співпадають";
                        errors["confirmPassword"] = "Паролі не співпадають";
                    }
                    if (["name", "password", "confirmPassword"].includes(key) && !values[key]) {
                        errors[key] = "Обов'язково";
                    }
                }
                console.log(errors);
                return errors;
            }}
        >
            {({
                values,
                errors,
                setFieldValue,
                handleSubmit
            }) => {
                return (
                    <Grid container spacing={1} tabIndex="0">
                        <Grid container spacing={2} item xs={12} md={6}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Логін"
                                    disabled
                                    InputLabelProps={{ shrink: true }}
                                    value={values.name}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name}
                                    fullWidth
                                    variant="outlined"
                                    onChange={({ target: { value } }) => setFieldValue("name", value)}
                                    margin="dense"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="filled-password-input"
                                    label="Пароль"
                                    fullWidth
                                    value={values.password}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password}
                                    type={values.seePassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => setFieldValue("seePassword", !values.seePassword)}>
                                                {values.seePassword ? <VisibilityOff /> : <Visibility />}
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={({ target: { value } }) => setFieldValue("password", value)}
                                    variant="outlined"
                                    margin="dense"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="filled-password-input"
                                    label="Пароль ще раз"
                                    value={values.confirmPassword}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword}
                                    type={values.seePassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => setFieldValue("seePassword", !values.seePassword)}>
                                                {values.seePassword ? <VisibilityOff /> : <Visibility />}
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={({ target: { value } }) => setFieldValue("confirmPassword", value)}
                                    variant="outlined"
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Опис"
                                    fullWidth
                                    value={values.description}
                                    onChange={({ target: { value } }) => setFieldValue("description", value)}
                                    multiline
                                    rows="4"
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Button onClick={props.onClose} onKeyPress={({ key }) => (key === "Enter" ? props.onClose() : "")}>
                                Скасувати
                            </Button>
                            <Button onClick={() => handleSubmit()} onKeyPress={({ key }) => (key === "Enter" ? handleSubmit() : "")}>
                                Додати
                            </Button>
                        </Grid>
                    </Grid>
                );
            }}
        </Formik>
    );
};

export default AddUserForm;
