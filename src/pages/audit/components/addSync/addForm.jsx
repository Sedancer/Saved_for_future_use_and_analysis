import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio
} from "@material-ui/core";
import {Formik} from "formik";
import Autocomplete from "@/components/autocomplete";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/uk";
import MomentUtils from "@date-io/moment";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {GET_COMMUTATORS} from "@redux/commutators/actions";

const useStyles = makeStyles({
  form: {
    margin: 9,
  },
});
const AddForm = (props) => {
  const classes = useStyles();
  const {language} = useSelector(({admin}) => admin);
  useEffect(() => {
    moment.locale(language);
  }, [language]);
  const {t} = useTranslation(['audit', 'btn']);
  const dispatch = useDispatch();
  const {commutators} = useSelector((state) => state.commutators);
  useEffect(() => {
    dispatch(GET_COMMUTATORS());
  }, [dispatch]);

  const data = commutators.map((o) => ({...o, label: o.ovopName, value: o.ovopId}));

  const [type, setType] = useState('1');
  const handleChange = (event) => setType(event.target.value);

  return (
    <div>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={language}>
        <Formik
          initialValues={{
            ovopId: null,
            startTime: null,
            isSync: false,
            period: 1,
          }}
          onSubmit={(val, actions) => {
            actions.setSubmitting(true);
            const answer = {
              ovopId: val.ovopId.value,
              IsSyncRequested: val.isSync,
            };
            if (type === '2') {
              answer.startDateTime = moment(val.startTime).toISOString();
              answer.periodInDays = +val.period;
            }
            if (type === '3') {
              answer.startDateTime = moment(val.startTime).toISOString();
            }
            props.onSubmitNow({...answer});
            props.onClose();
          }}
          validate={(values) => {
            let errors = {};
            for (let key in values) {
              if (["ovopId"].includes(key) && !values[key]) {
                errors[key] = "Обов'язково";
              }
              if (key === "startTime" && moment(values[key]).valueOf() < moment(new Date()).valueOf()) {
                errors[key] = "Дата менше мінімальної дати";
              }
              if (key === "period" && Number.isInteger(+values[key]) && +values[key] >= 1) {
                // console.log("a", key);
              } else if (key === "period") {
                // console.log(key);
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
            return (
              <Grid container spacing={1} tabIndex="0" className={classes.form}>
                <Grid container spacing={2} style={{minHeight: 160}} item xs={12}>
                  <Grid item xs={12} sm={3}>
                    <FormControl>
                      <RadioGroup
                        value={type}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="1" control={<Radio/>} label={t("Негайний")}/>
                        <FormControlLabel value="2" control={<Radio/>} label={t("Періодичний")}/>
                        <FormControlLabel value="3" control={<Radio/>} label={t("Запланований")}/>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid container xs={12} sm={8} spacing={1}>
                    <Grid item xs={8} sm={6}>
                      <Autocomplete
                        margin="dense"
                        placeholder=""
                        type="text"
                        label={t("ОВОП")}
                        error={Boolean(errors.ovopId)}
                        name="actions"
                        value={values.ovopId}
                        data={data}
                        onChange={(value) => setFieldValue("ovopId", value)}
                      />
                    </Grid>
                    {(type === '2' || type === '3') &&
                    (<Grid item xs={8} sm={6}>
                      <DateTimePicker
                        label={t("Старт")}
                        inputVariant="outlined"
                        margin="dense"
                        minutesStep={5}
                        error={Boolean(errors.startTime)}
                        minDate={new Date()}
                        fullWidth
                        cancelLabel={false}
                        okLabel={false}
                        autoOk
                        disableToolbar
                        format="YYYY-MM-DD HH:mm"
                        ampm={false}
                        helperText={errors.startTime}
                        value={values.startTime}
                        onChange={(value) => setFieldValue("startTime", value)}
                      />
                    </Grid>)
                    }
                    {type === '2' && (
                      <Grid item xs={8} sm={6}>
                        <TextField
                          id="filled-password-input"
                          label={t("Періодичність (у днях)")}
                          fullWidth
                          type="number"
                          value={values.period}
                          error={Boolean(errors.period)}
                          helperText={errors.period}
                          onChange={({target: {value}}) => setFieldValue("period", value)}
                          variant="outlined"
                          margin="dense"
                        />
                      </Grid>)
                    }
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControlLabel
                      style={{marginTop: 0}}
                      control={
                        <Checkbox
                          checked={values.isSync}
                          onChange={({target: {checked}}) => setFieldValue("isSync", checked)}
                          value="checkedC"
                        />
                      }
                      label={t("Синхронізувати")}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{textAlign: "right"}}>
                  <Button onClick={props.onClose}>{t("btn:Скасувати")}</Button>
                  <Button onClick={() => handleSubmit()}
                          onKeyPress={({key}) => (key === "Enter" ? handleSubmit() : "")}>
                    {type === '1'
                      ? t('Виконати зараз')
                      : t('btn:Додати')
                    }
                  </Button>
                </Grid>
              </Grid>
            );
          }}
        </Formik>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default AddForm;
