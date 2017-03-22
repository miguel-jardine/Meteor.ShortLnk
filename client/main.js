import React from "react";
import ReactDOM from "react-dom";

import { Meteor } from "meteor/meteor";
import { Router, Route, browserHistory } from "react-router";
import { Tracker } from "meteor/tracker";

import Signup from "../imports/ui/Signup";
import Link from "../imports/ui/Link";
import NotFound from "../imports/ui/NotFound";
import Login from "../imports/ui/Login";

// window.browserHistory = browserHistory;

const protectedPage = ["/links"];
const loginPage = ["/", "/signup"];

function onEnterLoginPage () {
  if (Meteor.userId()) browserHistory.replace("/links");
}

function onEnterPrivatePage () {
  if (!Meteor.userId()) browserHistory.replace("/");
}

const route = (
  <Router history={browserHistory}>
    <Route exact path="/" component={Login} onEnter={onEnterLoginPage} />
    <Route path="/login" component={Login} onEnter={onEnterLoginPage} />
    <Route path="/signup" component={Signup}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound}/>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const onProtectedPage = protectedPage.includes(pathname);
  const onLoginPage = loginPage.includes(pathname);

  if (onProtectedPage && !isAuthenticated) {
    browserHistory.replace("/");
  } else if (onLoginPage && isAuthenticated) {
    browserHistory.replace("/links");
  }
});

Meteor.startup(() => {
  ReactDOM.render(route, document.getElementById("app"));
});
