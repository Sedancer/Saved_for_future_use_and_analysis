import React, {useState, useEffect, useCallback} from "react";
import moment from "moment";
import {Grid, Button, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTranslation } from 'react-i18next';
import SelectControl from "../../components/SelectControl";
import { useDispatch, useSelector } from 'react-redux';
// const logLevels = ["Debug", "Verbose", "Information", "Warning", "Error", "Fatal"];
// const modes = ["Show", "Partial", "Hide"];

const languageList = [
  {
    value: 'uk',
    text: 'УКР'
  },
  {
    value: 'en',
    text: 'ENG'
  }
];

const VERSION = process.env.REACT_APP_FRONT_END_VERSION || 'TEMP_REACT_APP_FRONT_END_VERSION';

const Admin = ({logLevel, mode, onUpdateLog, onUpdateMode}) => {
  const dispatch = useDispatch();
  const { language: defaultLanguage } = useSelector(({ admin }) => admin);
  const [newLogLevel, setLog] = useState(null);
  const [newMode, setMode] = useState(null);
  const {selects: {serilogMinimumLevels: logLevels = [], serilogConcealModes: modes = [], applicationVersion, startTime} = {}} = useSelector((state) => state.library);
  useEffect(() => {
    setLog(logLevel);
  }, [logLevel]);

  useEffect(() => {
    setMode(mode);
  }, [mode]);

  const { t } = useTranslation('dictionary');
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(defaultLanguage);
  }, [defaultLanguage, i18n]);

  const handleChangeLanguage = useCallback(
    ({ target: { value } }) => {
      localStorage.setItem('language', JSON.stringify(value));
      dispatch({
        type: 'CHANGE_LANGUAGE',
        payload: value,
      });
    },
    [dispatch],
  );

  return (
    <div>
      <div style={{
        border: "1px solid #999",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, .16)",
        minHeight: "200px",
        borderRadius: "4px",
        backgroundColor: "#525d67"
      }}>
        <div style={{
          height: "50px",
          paddingLeft: "35px",
          borderBottom: "1px solid #999",
          display: "flex",
          alignItems: "center",
          fontSize: "1.1rem",
          fontWeight: "bold"
        }}>
          Serilog setup
        </div>
        <div style={{padding: '30px'}}>
          <Grid container spacing={3} alignItems="center">
            <Grid item sm={4}>
              <Autocomplete
                value={newMode}
                onChange={(_, newValue) => setMode(newValue)}
                options={modes}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Conceal mode" margin="dense"
                                                    variant="outlined"/>}
              />
            </Grid>
            <Grid item xs={4} sm={1}>
              <Button
                fullWidth
                style={{height: 42}}
                variant="outlined"
                margin="dense"
                onClick={() => onUpdateMode(newMode)}
                disabled={newMode === mode || !newMode}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={8} sm={4}>
              <Autocomplete
                value={newLogLevel}
                onChange={(_, newValue) => setLog(newValue)}
                options={logLevels}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Log level" margin="dense" variant="outlined"/>}
              />
            </Grid>
            <Grid item xs={4} sm={1}>
              <Button
                fullWidth
                margin="dense"
                style={{height: 42}}
                variant="outlined"
                onClick={() => onUpdateLog(newLogLevel)}
                disabled={logLevel === newLogLevel || !newLogLevel}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>

      <div style={{
        border: "1px solid #999",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, .16)",
        minHeight: "200px",
        borderRadius: "4px",
        backgroundColor: "#525d67",
        marginTop: 24,
      }}>
        <div style={{
          height: "50px",
          paddingLeft: "35px",
          borderBottom: "1px solid #999",
          display: "flex",
          alignItems: "center",
          fontSize: "1.1rem",
          fontWeight: "bold"
        }}>
          Info
        </div>
        <div style={{padding: '30px'}}>
          {applicationVersion && <div>application version: {applicationVersion}</div>}
          {VERSION && <div>front end version: {VERSION}</div>}
          {startTime && <div>start time: { moment(startTime).format("YYYY-MM-DD HH:mm:ss")}</div>}
        </div>
      </div>

      <div style={{
        border: "1px solid #999",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, .16)",
        minHeight: "150px",
        borderRadius: "4px",
        backgroundColor: "#525d67",
        marginTop: 24,
      }}>
        <div style={{
          height: "50px",
          paddingLeft: "35px",
          borderBottom: "1px solid #999",
          display: "flex",
          alignItems: "center",
          fontSize: "1.1rem",
          fontWeight: "bold"
        }}>
          {t('мова')}
        </div>
        <div style={{padding: '30px'}}>
          <SelectControl
            items={languageList}
            selectedItem={defaultLanguage}
            variant="standard"
            onHandleChange={handleChangeLanguage}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
