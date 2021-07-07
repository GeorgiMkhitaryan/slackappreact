import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SimpleContainer from "./Components/Container";
import PrivateRoute from "./middleware/authComponent";
import Header from "./Components/Header";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login></Login>
      </Route>
      <Route exact path="/signup">
        <div className="Login-form">
          <SignUp></SignUp>
        </div>
      </Route>
      <PrivateRoute>
        <Route exact path="/home">
          <div className="App">
            <div className="Header">
              <Header></Header>
            </div>
            <SimpleContainer />
          </div>
        </Route>
      </PrivateRoute>
      <Redirect to="/"></Redirect>
    </Switch>
  );
}

export default App;
