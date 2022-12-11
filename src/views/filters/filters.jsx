import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {map} from "lodash";
import {createStyles, withStyles} from "@material-ui/core/styles";
import {isEmpty} from "lodash";
import {TextField, Button} from "@material-ui/core";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/uk";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';

import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';

import Select from "@components/Select";
import {
  currentCallsFiltersList,
  alarmsFiltersList,
  objectFiltersList,
  commutatorsFiltersList,
  auditsFiltersList,
  auditsInfoFiltersList,
} from "@constants/filters"
import {useSelector} from "react-redux";

const styles = () => createStyles({
  root: {
    margin: 0,
  },
  headerBlockFilters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "45px",
  },
  titleFilter: {
    fontSize: "1.2rem"
  },
  btnFilter: {
    fontSize: "0.7rem",
    fontWeight: "normal",
    letterSpacing: "1px"
  },
  filtersItem: {
    marginBottom: "10px",
    width: "100%",
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0
    }
  },
  filtersItemDataPick: {
    width: "100%",
    height: 40,
    marginBottom: "10px"
  },
  option: {
    fontSize: 14,
  },
  btnOk: {
    marginTop: 16,
    width: '100%',
    border: '1px solid #fff'
  }
})

const Filters = (props) => {
  const { language } = useSelector(({ admin }) => admin);
  const {classes, getFiltersFields, name} = props;
  const {t} = useTranslation(['filter', 'btn']);
  const [state, setState] = useState([]);
  let listFilters = [];

  useEffect(() => {
    moment.locale(language);
  }, [language]);

  if (name === 'alarms') listFilters = alarmsFiltersList;
  if (name === 'ring') listFilters = currentCallsFiltersList;
  if (name === 'object') listFilters = objectFiltersList;
  if (name === 'commutators') listFilters = commutatorsFiltersList;
  if (name === 'audit') listFilters = auditsFiltersList;
  if (name === 'auditInfo') listFilters = auditsInfoFiltersList;

  const setFieldValue = ({name, ...fields}) => {
    setState({
      ...state,
      [name]: {name, ...fields}
    });
  };

  const handleClick = () => {
    if (isEmpty(state)) return getFiltersFields({});
    const preparedState = map(state, (value, key) => ({value, name: key}));
    getFiltersFields(preparedState);
  }
  const handleClickClearFilter = () => {
    setState({});
    getFiltersFields({});
  }

  return (
    <div className={classes.root}>
      <div className={classes.headerBlockFilters}>
        <div className={classes.titleFilter}>{t('Фільтри')}</div>
        <Button className={classes.btnFilter} onClick={handleClickClearFilter}>{t('очистити всі фільтри')}</Button>
      </div>
      {listFilters.map(
        // eslint-disable-next-line array-callback-return
        filterItem => {
          const {name, type, title} = filterItem;
          if (type === "autocomplete") {
            return (
              <Select
                key={name}
                name={name}
                title={t(title)}
                value={state[name]?.value}
                onChange={(v) => setFieldValue({
                  name: name,
                  value: v,
                  type: type
                })}
              />
            )
          }
          if (type === "text") {
            return (<TextField
              key={name}
              label={t(title)}
              value={state[name]?.value || ''}
              fullWidth
              variant="outlined"
              onChange={({target: {value}}) => setFieldValue({
                name: name,
                value,
                type: type
              })}
              margin="dense"
              className={classes.filtersItem}
            />)
          }
          if (type === "number") {
            return (<TextField
              key={name}
              label={t(title)}
              value={state[name]?.value || ''}
              fullWidth
              variant="outlined"
              onChange={({target: {value}}) => setFieldValue({
                name: name,
                value: value ? Number.parseInt(value, 10) : '',
                type: type
              })}
              margin="dense"
              className={classes.filtersItem}
            />)
          }


          if (type === "strictly") {
            let strictly = state[name]?.strictly;
            if (strictly === undefined) strictly = filterItem?.strictly;
            return (
              <FormControl key={name} className={classes.filtersItem} variant="outlined" margin="dense">
                <InputLabel variant="outlined" htmlFor={`standard-adornment-${name}`}>{t(title)}</InputLabel>
                <OutlinedInput
                  id={`standard-adornment-${name}`}
                  key={name}
                  label={t(title)}
                  value={state[name]?.value || ''}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  onChange={({target: {value}}) => setFieldValue({
                    name,
                    value: parseInt(value, 10),
                    type,
                    strictly
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setFieldValue(
                          {
                            name,
                            value: state[name]?.value,
                            type,
                            strictly: !strictly
                          }
                        )}
                      >
                        <Tooltip
                          title={strictly ? t('Суворе порівняння') : t('Не суворе порівняння')}
                        >
                          {strictly ? <FormatAlignJustifyIcon/> : <FormatAlignCenterIcon/>}
                        </Tooltip>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )
          }
          if (type === "dateTimePicker") {
            return (
              <MuiPickersUtilsProvider utils={MomentUtils} key={name} locale={language}>
                <DateTimePicker
                  className={classes.filtersItemDataPick}
                  inputVariant="outlined"
                  margin="dense"
                  label={t(title)}
                  format="YYYY-MM-DD HH:mm"
                  clearable
                  autoOk
                  hideTabs
                  ampm={false}
                  value={state[name]?.value || null}
                  onChange={(value) => setFieldValue({name, value, type})}
                  allowKeyboardControl={false}
                  leftArrowIcon={<ArrowBackIosIcon/>}
                  rightArrowIcon={<ArrowForwardIosIcon/>}
                  okLabel={t("btn:Зберегти")}
                  cancelLabel={t("btn:Скасувати")}
                  clearLabel={t("btn:Очистити")}
                />
              </MuiPickersUtilsProvider>
            )
          }
        }
      )}
      <div>
        <Button
          className={classes.btnOk}
          onClick={handleClick}
        >{t('btn:Застосувати')}</Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(Filters);
