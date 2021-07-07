import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../errorHendler/errorHendler";
import { setErrorMsg } from "../../Reducers/rootReducer";
import { useDispatch } from "react-redux";
import { nodeURL } from "../../globalConstants";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const state = {};

  const loginUser = () => {
    axios
      .post(`${nodeURL}/auth/login`, state)
      .then((data) => {
        history.push("/home");
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
    <div className="Login-form">
      <div className="form-container">
        <div>
          <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            label="User Name"
            onChange={(e) => {
              state.username = e.target.value;
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
              state.password = e.target.value;
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <Button color="inherit" onClick={() => loginUser()}>
            Log In
          </Button>

          <Button color="inherit">
            <Link to="/signup">SignUp</Link>
          </Button>
          <ErrorMessage />
        </div>
      </div>
    </div>
  );
}
