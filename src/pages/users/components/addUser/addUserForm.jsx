import React, { useState } from "react";
import {useTranslation} from "react-i18next";
import { Grid, TextField, LinearProgress, Button, InputAdornment } from "@material-ui/core";
import { filter, isEmpty } from "lodash";
import { Formik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { GET_CLAIM_NAME, POSSIBLE_CLAIMS } from "@/utils/claims";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const AddUserForm = (props) => {
  const { t } = useTranslation(['users', 'btn']);
  const { t:rulesT } = useTranslation('rules');
    return (
        <Formik
            initialValues={{
                name: "",
                password: "",
                confirmPassword: "",
                rules: [],
                possibleRules: POSSIBLE_CLAIMS().map((item => ({name:item, checked: false, title: GET_CLAIM_NAME(item)}))),
                seePassword: false,
                description: "",
            }}
            onSubmit={(val, actions) => {
                actions.setSubmitting(true);
                props.onSubmit({
                    login: val.name,
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
                    if (props.isLoginFree) {
                        errors["login"] = props.isLoginFree;
                    }
                    if (["name", "password", "confirmPassword"].includes(key) && !values[key]) {
                        errors[key] = "Обов'язково";
                    }
                }
                return errors;
            }}
        >
            {({
              values,
              errors,
              setFieldValue,
              handleSubmit
            }) => {

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const [viewRoles, setViewRoles] = useState(values.possibleRules);
              const editOneRole = (event) => {
                const newVR = viewRoles.map(item => {
                  if (item.name === event.target.name ) return {...item, checked: event.target.checked }
                  return item
                })
                setViewRoles(newVR);
                const filterRoles = filter(newVR, ({ checked }) => checked);
                if (isEmpty(filterRoles)) return  setFieldValue('rules', []);
                const arrSrtRoles = filterRoles.map(({ name }) => name);
                setFieldValue('rules', arrSrtRoles);
              };

                return (
                    <Grid container spacing={1} tabIndex="0">
                        <Grid container spacing={1} item xs={12} sm={8} md={4}>
                            <Grid item xs={12}>
                                <TextField
                                    label={t('Логін')}
                                    InputLabelProps={{ shrink: true }}
                                    value={values.name}
                                    error={Boolean(errors.name) || props.isLoginFree}
                                    disabled={props.loading}
                                    helperText={errors.name || props.isLoginFree}
                                    onBlur={() => (values.name && !values.name.includes(" ") ? props.check(values.name) : "")}
                                    fullWidth
                                    variant="outlined"
                                    onChange={({ target: { value } }) => setFieldValue("name", value)}
                                    margin="dense"
                                />
                                <div style={{ minHeight: 4 }}>{props.loading && <LinearProgress />}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="filled-password-input"
                                    label={t('Пароль')}
                                    fullWidth
                                    value={values.password}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password}
                                    type={values.seePassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => setFieldValue("seePassword", !values.seePassword)}>
                                                {values.seePassword ? <VisibilityOff></VisibilityOff> : <Visibility></Visibility>}
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
                                    label={t('Пароль ще')}
                                    value={values.confirmPassword}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword}
                                    type={values.seePassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => setFieldValue("seePassword", !values.seePassword)}>
                                                {values.seePassword ? <VisibilityOff></VisibilityOff> : <Visibility></Visibility>}
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
                                    label={t('Опис')}
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
                        <Grid container spacing={0} item xs={12} sm={12} md={5} style={{ marginLeft: 100 }}>
                          {viewRoles.map((item) => (
                            <Grid item xs={12} >
                              <FormControlLabel
                                key={item.name}
                                control={
                                  <Checkbox
                                    checked={item.checked}
                                    onChange={(e)=>editOneRole(e)}
                                    name={item.name}
                                    color="primary"
                                  />
                                }
                                label={rulesT(item.title)}
                              />
                            </Grid>
                          ))}
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Button onClick={props.onClose} onKeyPress={({ key }) => (key === "Enter" ? props.onClose() : "")}>
                              {t('btn:Скасувати')}
                            </Button>
                            <Button onClick={() => handleSubmit()} onKeyPress={({ key }) => (key === "Enter" ? handleSubmit() : "")}>
                              {t('btn:Додати')}
                            </Button>
                        </Grid>
                    </Grid>
                );
            }}
        </Formik>
    );
};

export default AddUserForm;
