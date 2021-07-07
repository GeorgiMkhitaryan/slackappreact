import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import useDebounce from "../../../Hooks/useDebounce";
import axios from "axios";
import ErrorMessage from "../../errorHendler/errorHendler";
import { useDispatch } from "react-redux";
import { setErrorMsg } from "../../../Reducers/rootReducer";
import { nodeURL } from "../../../globalConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function UserSettings({ userSettings }) {
  const classes = useStyles();
  const [state, setState] = useState(userSettings);
  const dispatch = useDispatch();
  const debouncedcompanyname = useDebounce(state.companyname, 500);

  useEffect(() => {
    if (
      debouncedcompanyname &&
      userSettings.companyname !== debouncedcompanyname
    ) {
      axios
        .post(`${nodeURL}/auth/hascompanyname`, {
          companyname: debouncedcompanyname,
        })
        .then(() => {})
        .catch((error) => {
          dispatch(
            setErrorMsg({
              success: false,
              message: error.response.data.message,
            })
          );
        });
    }
  }, [debouncedcompanyname]);

  function saveSettings() {
    let token = localStorage.getItem("token");
    axios
      .post(`${nodeURL}/home/changesettings`, state, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((data) => {
        dispatch(
          setErrorMsg({
            success: true,
            message: data.data.message,
          })
        );
      })
      .catch((error) => {
        dispatch(
          setErrorMsg({
            success: false,
            message: error.response.data.message,
          })
        );
      });
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="userSettings">
        <TextField
          id="filled-textarea"
          label="User Name"
          multiline
          variant="filled"
          value={state.username}
          onChange={(e) =>
            setState((prevProps) => ({
              ...prevProps,
              username: e.target.value,
            }))
          }
        />
        <TextField
          id="filled-textarea"
          label="Company Name"
          multiline
          variant="filled"
          value={state.companyname}
          onChange={(e) =>
            setState((prevProps) => ({
              ...prevProps,
              companyname: e.target.value,
            }))
          }
        />
        <TextField
          id="filled-textarea"
          label="Email"
          multiline
          variant="filled"
          value={state.email}
          onChange={(e) =>
            setState((prevProps) => ({ ...prevProps, email: e.target.value }))
          }
        />
        <Button color="inherit" onClick={() => saveSettings()}>
          Send
        </Button>
      </div>
      <ErrorMessage />
    </form>
  );
}
