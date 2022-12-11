import React from "react";
import {useTranslation} from "react-i18next";
import {
	Grid,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
	InputAdornment
} from "@material-ui/core";
import {Formik} from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const EditUserPassword = ({isOpen, onClose, onSubmit, login}) => {
  const { t } = useTranslation(['users', 'btn']);
	return (
		<Dialog
			open={isOpen}
			fullWidth
			maxWidth="sm"
			onClose={onClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle id="alert-dialog-slide-title">{`${t('Редагування пароля користувача')}: ${login}`}</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={{
						password: "",
						confirmPassword: "",
						seePassword: false,
					}}
					onSubmit={(val, actions) => {
						actions.setSubmitting(true);
						onSubmit(val.password);
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
								<Grid container spacing={2} item xs={12} sm={12}>
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
													<InputAdornment position="end"
																					onClick={() => setFieldValue("seePassword", !values.seePassword)}>
														{values.seePassword ? <VisibilityOff/> : <Visibility/>}
													</InputAdornment>
												),
											}}
											onChange={({target: {value}}) => setFieldValue("password", value)}
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
													<InputAdornment position="end"
																					onClick={() => setFieldValue("seePassword", !values.seePassword)}>
														{values.seePassword ? <VisibilityOff/> : <Visibility/>}
													</InputAdornment>
												),
											}}
											onChange={({target: {value}}) => setFieldValue("confirmPassword", value)}
											variant="outlined"
											margin="dense"
										/>
									</Grid>
								</Grid>

								<Grid item xs={12} style={{textAlign: "right"}}>
									<Button onClick={onClose} onKeyPress={({key}) => (key === "Enter" ? onClose() : "")}>
                    {t('btn:Скасувати')}
									</Button>
									<Button onClick={() => handleSubmit()}
													onKeyPress={({key}) => (key === "Enter" ? handleSubmit() : "")}>
                    {t('btn:Змiнити')}
									</Button>
								</Grid>
							</Grid>
						);
					}}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};

export default EditUserPassword;
