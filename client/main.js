import './main.html';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import {browserHistory} from 'react-router';

import {onAuthChange, routes} from '../imports/routes/routes'
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if (selectedNoteId) {
  //  browserHistory.replace(`/journal/${selectedNoteId}`);
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
  Session.set('selectedNoteId', undefined);
});
