import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Grid, Button, Typography, IconButton, InputAdornment, TextField, CircularProgress } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import getVendorName from "@views/productName";

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonContainer: {
      textAlign: "right",
    },
    container: {
      position: "relative",
    },
    error: {
      textAlign: "center",
      color: theme.palette.error.main,
    },
    loading: {
      width: "100%",
      height: "100%",
      display: "flex",
      position: "absolute",
      background: "rgba(0,0,0,0.1)",
      alignItems: "center",
      justifyContent: "center",
      justifyItems: "center",
    },
  })
);

const Auth = ({ onLogin, isError, loading }) => {
  const classes = useStyles();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errL, setErrL] = useState(null);
  const [errP, setErrP] = useState(null);

  const onKeyPress = ({ key }) => {
    if (key !== "Enter") return;
    // console.log(login);
    if (login.length === 0) {
      setErrL("Обов'язково");
      return;
    }
    if (password.length === 0) {
      setErrP("Обов'язково");
      return;
    }
    if (errL || errP) return;

    onSubmit();
  };
  useEffect(() => {
    document.addEventListener("keypress", onKeyPress);

    return () => {
      document.removeEventListener("keypress", onKeyPress);
    };
  });

  useEffect(() => {
    if (login.includes(" ")) setErrL("Неприпустимі символи");
    if (password.includes(" ")) setErrP("Неприпустимі символи");
  }, [login, password]);

  const onSubmit = () => {
    if (!errL && !errP)
      onLogin({
        login,
        password,
      });
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      onKeyPress={({ key }) => {
        if (errL || errP) return;
        if (key === "Enter") {
          onSubmit();
        }
      }}
    >
      <Grid container className={classes.container} spacing={2} item xs={12} sm={4}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.error}>
            {isError && "Логін або пароль неправильний"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Логін"
            inputProps={{
              autoFocus: true,
            }}
            error={errL}
            variant="outlined"
            value={login}
            helperText={errL}
            fullWidth
            onChange={({ target: { value } }) => {
              setErrL(null);
              setLogin(value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Пароль"
            type={showPassword ? "text" : "password"}
            value={password}
            error={errP}
            variant="outlined"
            helperText={errP}
            fullWidth
            onChange={({ target: { value } }) => {
              setErrP(false);
              setPassword(value);
            }}
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button onClick={onSubmit} disabled={errL || errP} variant="outlined">
            Авторизуватись
          </Button>
        </Grid>
        {loading && (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        )}
      </Grid>
      <Helmet>
        <title>{getVendorName()}</title>
      </Helmet>
    </Grid>
  );
};

export default Auth;
