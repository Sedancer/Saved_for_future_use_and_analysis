import React, {useEffect, useRef, useState, useMemo} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import Select from "@components/Select";
import {isEmpty} from "lodash";
import {Formik} from "formik";
import validator from "validator";
import {columnFields} from "@constants/columnFieldsCommutators";
import {CLIENT_NAME} from '@/http/config';
import {makeStyles} from "@material-ui/core/styles";
import {hasOvopName, hasNeId} from '@/store/commutators/actions';

const useStyles = makeStyles({
	item: {
		minHeight: 66,
		margin: '4px 0',
		'& .MuiFormControl-root.MuiFormControl-marginDense': {
			margin: 0,
		}
	},
});

const AddUserForm = (props) => {
	const classes = useStyles();
	const inputRef = useRef(null);
	const [savedData, setSavedData] = useState({});

	function openJsonFile(evt) {
		if (evt.target.files.length === 0) return;
		const fileObj = evt.target.files[0];
		const reader = new FileReader();
		reader.onload = e => {
			const fileContents = JSON.parse(e.target.result);
			setSavedData(fileContents);
			//Здесь обработка ошибое
		};
		reader.readAsText(fileObj);
	}

	const upload = (event) => {
		event.preventDefault();
		inputRef.current?.click()
	}



  const iValues = useMemo(() => {
    let fieldsAdd = {};
    if (CLIENT_NAME === 'EricssonCs') fieldsAdd = {
      x1Ip: "",
      x1Port: "",
      x1Login: "",
      x1Password: "",
      protectedLogin: "",
      protectedPassword: "",
      subsystemType: "",
      softwareVersion: "",
      commandMode: "",
      mscNumber: null
    };
    if (CLIENT_NAME === 'EricssonEps') fieldsAdd = {
      x1SshLogin: "",
      x1SshPassword: "",
      subsystemType: "",
      x1SshIp: "",
      x1SshPort: "",
      x1XmlIp: "",
      x1XmlPort: "",
    };
    if (CLIENT_NAME === 'ZteIms') fieldsAdd = {
      x1Ip: "",
      x1Port: "",
      x1Login: "",
      x1Password: "",
    };
    if (CLIENT_NAME === 'HuaweiNgnFix') fieldsAdd = {
      x3Port: "",
      x1Ip: "",
      x1Port: "",
      x1Login: "",
      x1Password: "",
    };
    return ({
      ovopName: "",
      x2Ip: "",
      x3Ip: "",
      neId: "",
      type: "",
      x3Port: "",
      ...fieldsAdd
    })}, []);

	const [initialValues, setInitialValues] = useState({iValues});

	useEffect(
		() => {
			if (isEmpty(savedData)) return;
			const {
				neId,
				...d
			} = savedData;
			setInitialValues({
				...iValues,
        ...d,
				neId: `${neId}`
			})
		},
		[savedData, iValues]);

	return (
		<Formik
			enableReinitialize
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
					//ToDO: Сделать преобразования на уровне отправки, редакса
					x1Port: +x1Port,
					x2Port: +x2Port,
					x3Port: +x3Port,
					neId: +neId
				});
				props.onClose();
			}}
			validate={async (values) => {
				let errors = {};

				for (let key in values) {
					// Добавить проверкуу по полям
					// if (Object.keys(values).includes(key) && !values[key]) {
					// 	errors[key] = "Обов'язково";
					// }
					if (["x1Ip, x2Ip, x3Ip"].includes(key) && !validator.isIP(values[key])) {
						errors[key] = "не дійсний ip";
					}
					if (["neId"].includes(key) && !Number.isInteger(+values[key])) {
						errors[key] = "тільки число";
					}
					if (["x1Port", "x2Port", "x3Port"].includes(key) && !validator.isPort(values[key].toString())) {
						errors[key] = "не дійсний port";
					}
					if (["ovopName"].includes(key)) {
						await hasOvopName(values[key]).then((data) => {
							if (data) {
								errors[key] = "Така назва існує"
							}
						})
					}
					if (["neId"].includes(key)) {
						await hasNeId(values[key]).then((data) => {
							if (data) {
								errors[key] = "Такый номер існує"
							}
						})
					}
				}
				console.log('errors', errors);
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
									<input
										type="file"
										multiple={false}
										accept=".json,application/json"
										onChange={evt => openJsonFile(evt)}
										ref={inputRef}
										style={{display: "none"}}
									/>
									<Button variant="contained" color="primary" onClick={upload}>
										Отримати з файлу
									</Button>
								</Grid>
								<Grid item xs={2}>
									<Button variant="contained" color="primary" onClick={props.onClose}
													onKeyPress={({key}) => (key === "Enter" ? props.onClose() : "")}>
										Скасувати
									</Button>
								</Grid>
								<Button disabled={!isValid} variant="contained" color="secondary" onClick={() => handleSubmit()}
												onKeyPress={({key}) => (key === "Enter" ? handleSubmit() : "")}>
									Додати
								</Button>
							</Grid>
						</Grid>
					</Grid>
				);
			}}
		</Formik>
	);
};


export default AddUserForm;
