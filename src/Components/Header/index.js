import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { signUp } from "../../Reducers/authReducer";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#3F0E40" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Slack App
          </Typography>
          <Button color="inherit" onClick={() => dispatch(signUp())}>
            Sing UP
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
