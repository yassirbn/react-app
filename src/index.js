import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss";
import "assets/demo/demo.css";

import indexRoutes from "routes/index.jsx";
import Login from "./components/Login/Login.jsx";
import Errors from "./components/Errors/Errors.jsx";
import Register from "./components/Register/Register";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
        <Route path="/Login" component={Login}/>
        <Route path="/Register" component={Register}/>
      {indexRoutes.map((prop, key) => {

        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
        <Route path="*" component={Errors}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
