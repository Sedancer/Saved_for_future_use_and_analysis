import React from "react";
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { Formik } from "formik";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/uk";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/uk";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  form: {
    margin: 9,
  },
});
const EditForm = (props) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="uk">
      <Formik
        initialValues={{
          ovopId: null,
          startTime: props.sync.nextAuditTime,
          isSync: props.sync.isSyncRequested,
          period: props.sync.periodInDays,
        }}
        onSubmit={(val, actions) => {
          actions.setSubmitting(true);
          props.onSubmit({
            ovopId: props.sync.ovopId,
            auditId: props.sync.auditId,
            startDateTime: moment(val.startTime).toISOString(),
            periodInDays: +val.period,
            IsSyncRequested: val.isSync,
          });
          props.onClose();
        }}
        validate={(values) => {
          let errors = {};
          for (let key in values) {
            if (["period", "startTime"].includes(key) && !values[key]) {
              errors[key] = "Обов'язково";
            }
            if (key === "startTime" && moment(values[key]).valueOf() < moment(new Date()).valueOf()) {
              errors[key] = "Дата менше мінімальної дати";
            }
            if (key === "period" && Number.isInteger(+values[key]) && +values[key] >= 1) {
            } else if (key === "period") {
              errors[key] = "Тільки число більше одиниці";
            }
          }
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
          console.log(values);
          return (
            <Grid container spacing={1} tabIndex="0" className={classes.form}>
              <Grid container spacing={2} item xs={12} style={{ minHeight: 160 }}>
                <Grid item xs={12} sm={4}>
                  <DateTimePicker
										margin="dense"
                    label="Старт"
                    minutesStep={5}
                    error={Boolean(errors.startTime)}
                    minDate={new Date()}
                    fullWidth
                    cancelLabel={false}
                    okLabel={false}
                    autoOk
                    disableToolbar
                    inputVariant="outlined"
                    format="YYYY-MM-DD HH:mm"
                    ampm={false}
                    helperText={errors.startTime}
                    value={values.startTime}
                    onChange={(value) => setFieldValue("startTime", value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Періодичність (у днях)"
                    fullWidth
										margin="dense"
                    type="number"
                    value={values.period}
                    error={Boolean(errors.period)}
                    helperText={errors.period}
                    onChange={({ target: { value } }) => setFieldValue("period", value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.isSync}
                        onChange={({ target: { checked } }) => setFieldValue("isSync", checked)}
                        value="checkedC"
                      />
                    }
                    label="Синхронізувати"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} style={{ textAlign: "right" }}>
                <Button onClick={props.onClose} onKeyPress={({ key }) => (key === "Enter" ? props.onClose() : "")}>
                  Скасувати
                </Button>
                <Button onClick={() => handleSubmit()} onKeyPress={({ key }) => (key === "Enter" ? handleSubmit() : "")}>
                  Редагувати
                </Button>
              </Grid>
            </Grid>
          );
        }}
      </Formik>
    </MuiPickersUtilsProvider>
  );
};

export default EditForm;
