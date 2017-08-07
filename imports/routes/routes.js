import React from 'react';
import {Meteor} from 'meteor/meteor';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import browserHistory from 'history';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = browserHistory.createBrowserHistory();

const unathenticatedPages = ['/', '/signup'];
const athenticatedPages = ['/dashboard'];
const isLoggedIn = () => {
  return Meteor.userId() !== null;
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  console.log("pathname: ", pathname);

  const isUnathenticatedPage = unathenticatedPages.includes(pathname);
  const isAthenticatedPage = athenticatedPages.includes(pathname);

  if (isLoggedIn() && isUnathenticatedPage) {
    history.replace('/dashboard');
  } else if (!isLoggedIn() && isAthenticatedPage) {
    history.replace('/');
  }
};

export const routes = (
  <BrowserRouter>
    <Switch >
      <Route exact path="/" render={() => (isLoggedIn() ? <Redirect to="/dashboard"/> : <Login/>)} />
      <Route path="/signup" render={() => (isLoggedIn() ? <Redirect to="/dashboard"/> : <Signup/>)} />
      <Route path="/login" render={() => (isLoggedIn() ? <Redirect to="/dashboard"/> : <Login/>)} />
      <Route path="/dashboard" render={() => (!isLoggedIn() ? <Login/> : <Dashboard />)} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </BrowserRouter>
);
