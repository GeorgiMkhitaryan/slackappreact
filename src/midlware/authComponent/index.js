import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { hasLodined } from "../../Reducers/authReducer";
import Login from "../../Components/Login";

const PrivateRoute = (props) => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  const { verified } = useSelector((state) => state.authReducer);
  const history = useHistory();
  useEffect(() => {
    axios
      .post("http://localhost:5000/auth/haslogined", null, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((data) => {
        dispatch(hasLodined(true));
      })
      .catch((err) => {
        dispatch(hasLodined(false));
        history.push("/");
      });
  }, [verified]);

  return verified ? <Route {...props} /> : <Login />;
};

export default PrivateRoute;
