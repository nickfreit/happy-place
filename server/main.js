import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import {SyncedCron} from 'meteor/percolate:synced-cron';
import moment from 'moment';

import '../imports/api/entries';
import '../imports/api/users';
import {Todos} from '../imports/api/todos';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

  SyncedCron.add({
    name: 'Remove old records',
    schedule: function(parser) {
      return parser.text('every 24 hours');
    },
    job: function() {
      Todos.remove( {dueAt: {$lt: moment().subtract(3, 'day').valueOf()} } );
    }
  });
  
  SyncedCron.start();

});
