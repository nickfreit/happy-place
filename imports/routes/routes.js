import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Signup from '../ui/Signup';
import Home from '../ui/Home';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Journal from '../ui/Journal';
import ToDo from '../ui/ToDo';
import Goals from '../ui/Goals';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/home', '/journal', '/todo', '/goals'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/home');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/home');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/home" component={Home} onEnter={onEnterPrivatePage}/>
    <Route path="/journal" component={Journal} onEnter={onEnterPrivatePage}/>
    <Route path="/todo" component={ToDo} onEnter={onEnterPrivatePage}/>
    <Route path="/goals" component={Goals} onEnter={onEnterPrivatePage}/>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
