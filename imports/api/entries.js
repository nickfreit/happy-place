import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Entries = new Mongo.Collection('entries');

if (Meteor.isServer) {
  Meteor.publish('entries', function () {
    return Entries.find({ userId: this.userId });
  });
}

Meteor.methods({
  'entries.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Entries.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },

  'entries.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Entries.remove({ _id, userId: this.userId });
  },

  'entries.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
     });

     Entries.update({_id, userId: this.userId}, {
       $set: {
        updatedAt: moment().valueOf(),
        ...updates
       }
     });
  }
});
