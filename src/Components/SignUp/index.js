import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  emailRegistration,
  emailVerified,
  setErrorMsg,
} from "../../Reducers/rootReducer";
import axios from "axios";
import { useHistory } from "react-router";
import useDebounce from "../../Hooks/useDebounce";
import ErrorMessage from "../errorHendler/errorHendler";
import { nodeURL } from "../../globalConstants";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SignUp() {
  const [singUpState, setSingUpState] = useState({
    email: null,
    companyId: null,
    companyname: "",
    comfirmPassword: null,
    password: null,
    activationCode: null,
  });
  const companyname = useDebounce(singUpState.companyname, 500);

  useEffect(() => {
    if (companyname) {
      axios
        .post(`${nodeURL}/auth/hascompanyname`, {
          companyname: companyname,
        })
        .then((data) => {
          const { companyname, condidateName } = data.data;
          if (companyname !== condidateName) {
            dispatch(
              setErrorMsg({
                success: false,
                message: `<${companyname}> this name already exists, I suggest this <${condidateName}>`,
              })
            );
          }
        });
    }
  }, [companyname]);

  let history = useHistory();

  const dispatch = useDispatch();
  const classes = useStyles();

  const { verified, emailRegistred, activateCode } = useSelector(
    (state) => state.rootReducer
  );

  const registerUser = () => {
    if (singUpState.password !== singUpState.comfirmPassword) {
      dispatch(
        setErrorMsg({
          success: false,
          message: `password confirm password are not the same`,
        })
      );
      return;
    }
    axios
      .post(`${nodeURL}/auth/registration`, {
        comfirmPassword: singUpState.comfirmPassword,
        password: singUpState.password,
        companyId: singUpState.companyId,
        username: singUpState.userName,
      })
      .then((data) => {
        history.push("/login");
      })
      .catch((error) => {
        dispatch(
          setErrorMsg({
            success: false,
            message: error.response.data.message,
          })
        );
      });
  };

  const emailVerification = () => {
    axios
      .post(`${nodeURL}/auth/emailverification`, {
        email: singUpState.email,
        companyname: singUpState.companyname,
      })
      .then((data) => {
        setSingUpState({
          ...singUpState,
          companyId: data.data.companyId,
        });
        dispatch(emailRegistration());
      })
      .catch((error) => {
        dispatch(
          setErrorMsg({
            success: false,
            message: error.response.data.message,
          })
        );
      });
  };

  const activationCode = () => {
    axios
      .post(`${nodeURL}/auth/activationcode`, {
        activationCode: singUpState.activationCode,
        companyId: singUpState.companyId,
      })
      .then(() => {
        dispatch(emailVerified());
      })
      .catch((error) => {
        dispatch(
          setErrorMsg({
            success: false,
            message: error.response.data.message,
          })
        );
      });
  };

  return (
    <div className="form-container">
      <div>
        {activateCode ? (
          <div>
            <TextField
              className={classes.margin}
              onChange={(e) => {
                setSingUpState({
                  ...singUpState,
                  activationCode: e.target.value,
                });
              }}
              id="input-with-icon-textfield"
              label="Activation Code"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <Button color="inherit" onClick={() => activationCode()}>
              Activate
            </Button>
          </div>
        ) : null}
        {emailRegistred ? (
          <div>
            <TextField
              className={classes.margin}
              onChange={(e) => {
                setSingUpState({
                  ...singUpState,
                  email: e.target.value,
                });
              }}
              id="input-with-icon-textfield"
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.margin}
              onChange={(e) => {
                setSingUpState({
                  ...singUpState,
                  companyname: e.target.value,
                });
              }}
              id="input-with-icon-textfield"
              label="Company name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />

            <Button color="inherit" onClick={() => emailVerification()}>
              Submit
            </Button>
            <Button color="inherit" onClick={() => history.push("/login")}>
              Log In
            </Button>
          </div>
        ) : null}
        {verified ? (
          <div>
            <TextField
              className={classes.margin}
              id="input-with-icon-textfield"
              label="User Name"
              onChange={(e) => {
                setSingUpState({
                  ...singUpState,
                  userName: e.target.value,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.margin}
              id="input-with-icon-textfield"
              label="Password"
              type="password"
              onChange={(e) => {
                setSingUpState({
                  ...singUpState,
                  password: e.target.value,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.margin}
              id="input-with-icon-textfield"
              label="Confirm Password"
              type="password"
              onChange={(e) => {
                setSingUpState({
                  ...singUpState,
                  comfirmPassword: e.target.value,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <Button color="inherit" onClick={() => registerUser()}>
              Sign Up
            </Button>
          </div>
        ) : null}
      </div>
      <ErrorMessage />
    </div>
  );
}
