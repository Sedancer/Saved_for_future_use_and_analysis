import React from "react";
import {Grid, TextField, Button} from "@material-ui/core";
import {columnFields} from "@constants/columnFieldsCommutators";
import {Formik} from "formik";
import validator from "validator";
import {CLIENT_NAME} from '@/http/config';
import Select from "@components/Select";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	item: {
		minHeight: 66,
		margin: '4px 0',
		'& .MuiFormControl-root.MuiFormControl-marginDense': {
			margin: 0,
		}
	},
});

const EditCommutatorForm = (props) => {
	const {
		commutator: {
			ovopName,
			neId,
			x1Ip,
			x1Port,
			mscNumber,
			type,
			softwareVersion,
			subsystemType,
			commandMode,
			protectedLogin,
			protectedPassword,
			x1Login,
			x1Password,
			x2Ip,
			x3Ip,
			x2Port,
			x3Port,
			neAddress,
			ovopId,
      x1SshLogin,
      x1SshPassword,
      x1SshIp,
      x1SshPort,
      x1XmlIp,
      x1XmlPort,
		} = {}
	} = props;

	let fieldsAdd = {};
	if (CLIENT_NAME === 'EricssonCs') fieldsAdd = {
    x1Ip,
    x1Port,
    x1Login,
    x1Password,
		protectedLogin,
		protectedPassword,
		subsystemType,
		softwareVersion,
		commandMode,
		mscNumber
	};
	if (CLIENT_NAME === 'EricssonEps') fieldsAdd = {
    x1SshLogin,
    x1SshPassword,
    x1SshIp,
    x1SshPort,
    x1XmlIp,
    x1XmlPort,
	};
	if (CLIENT_NAME === 'ZteIms') fieldsAdd = {
    x1Ip,
    x1Port,
    x1Login,
    x1Password,
	  x3Port
	};
	if (CLIENT_NAME === 'HuaweiNgnFix') fieldsAdd = {
    x1Ip,
    x1Port,
    x1Login,
    x1Password,
	  x3Port,
    neAddress
	};

	const initialValues = {
		ovopName,
		neId,
		x2Ip,
		x3Ip,
		x2Port,
		type,
		x3Port,
		...fieldsAdd
	};
	const classes = useStyles();
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(val, actions) => {
				actions.setSubmitting(true);
				const {
					x1Port,
					x2Port,
					x3Port,
					neId,
					...d
				} = val;
				props.onSubmit({
					...d,
					x1Port: +x1Port,
					x2Port: +x2Port,
					x3Port: +x3Port,
					neId: +neId,
					ovopId
				});
				props.onClose();
			}}
			validate={(values) => {
				let errors = {};
				// console.log(values);
				for (let key in values) {
					if (["x1Ip", "x2Ip", "x3Ip"].includes(key) && !validator.isIP(values[key])) {
						errors[key] = "не дійсний ip";
					}
					if (["neId"].includes(key) && !Number.isInteger(+values[key])) {
						errors[key] = "тільки число";
					}
					if (["x1Port", "x2Port", "x3Port"].includes(key) && !validator.isPort(values[key].toString())) {
						errors[key] = "не дійсний port";
					}
					if (Object.keys(values).includes(key) && !values[key]) {
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
					isValid,
					setFieldValue,
					handleSubmit
				}) => {
				const columnL = columnFields.length === 3 ? 4 : 3;
				return (
					<Grid container spacing={1} tabIndex="0">
						<Grid container spacing={3}>
							{columnFields.map(({fields, id}) => (
								<Grid item xs={12} sm={12} md={columnL} key={id}>
									{fields.map(
										// eslint-disable-next-line array-callback-return
										field => {
											if (field.type === "autocomplete") {
												return (
													<Select
														className={classes.item}
														key={field.name}
														name={field.name}
														title={field.title}
														value={values[field.name] || null}
														onChange={(value) => setFieldValue(field.name, value?.value)}
														inputProps={{
															error: Boolean(errors[field.name]),
															helperText: errors[field.name]
														}}
													/>
												)
											}
											if (field.type === "text") {
												return (
													<TextField
														className={classes.item}
														key={field.name}
														label={field.title}
														InputLabelProps={{shrink: true}}
														value={values[field.name] || ''}
														error={Boolean(errors[field.name])}
														helperText={errors[field.name]}
														fullWidth
														variant="outlined"
														onChange={({target: {value}}) => setFieldValue(field.name, value)}
														margin="dense"
													/>
												)
											}
											if (field.type === "number") {
												let addProps = {};
												if (field.props) {
													addProps = {
														min: field.props.min,
														max: field.props.max
													}
												}
												return (
													<TextField
														className={classes.item}
														key={field.name}
														label={field.title}
														InputLabelProps={{shrink: true}}
														value={values[field.name] || ''}
														error={Boolean(errors[field.name])}
														helperText={errors[field.name]}
														fullWidth
														type="number"
														variant="outlined"
														onChange={({target: {value}}) => setFieldValue(field.name, value)}
														margin="dense"
														{...addProps}
													/>
												)
											}
										})}
								</Grid>
							))
							}
						</Grid>
						<Grid item xs={12} container style={{padding: "20px 0"}}>
							<Grid
								container
								direction="row"
								justify="flex-end"
								alignItems="stretch"
							>
								<Grid item xs={2}>
									<Button variant="contained" color="primary" onClick={props.onClose}
													onKeyPress={({key}) => (key === "Enter" ? props.onClose() : "")}>
										Скасувати
									</Button>
								</Grid>
								<Button disabled={!isValid} variant="contained" color="secondary"
												onClick={() => handleSubmit()}
												onKeyPress={({key}) => (key === "Enter" ? handleSubmit() : "")}>
									Зберегти
								</Button>
							</Grid>
						</Grid>
					</Grid>
				);
			}}
		</Formik>
	);
};

export default EditCommutatorForm;
