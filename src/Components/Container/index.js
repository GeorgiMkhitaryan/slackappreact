import React, { useState } from "react";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import UserSettings from "./UserSettings";
import { nodeURL } from "../../globalConstants";
import { Button, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "../Modal";
import { logOut } from "../../Reducers/authReducer";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SimpleContainer(props) {
  const [userSettings, setUserSettings] = useState(null);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const classes = useStyles();

  function getSetting() {
    let token = localStorage.getItem("token");

    axios
      .post(
        `${nodeURL}/home/getsettings`,
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((data) => {
        setUserSettings(data.data.settings);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteUser() {
    let token = localStorage.getItem("token");

    axios
      .post(
        `${nodeURL}/home/deleteUser`,
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((data) => {
        dispatch(logOut());
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div className="Container">
        <div className="containerLeft">
          <div className="actionsButton">
            <Button
              disabled={userSettings ? false : true}
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => setOpen(true)}
            >
              delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
              onClick={() => getSetting()}
            >
              Settings
            </Button>
          </div>
        </div>
        <div className="containerRight">
          {userSettings ? <UserSettings userSettings={userSettings} /> : null}
        </div>
        <Modal
          succesDelete={deleteUser}
          hasOpen={open}
          setOpen={setOpen}
        ></Modal>
      </div>
    </>
  );
}
