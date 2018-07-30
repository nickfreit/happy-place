import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Goals = new Mongo.Collection('goals');

if (Meteor.isServer) {
  Meteor.publish('goals', function () {
    return Goals.find({ userId: this.userId });
  });
}

Meteor.methods({
  'goals.insert'(description, duration) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Goals.insert({
      description,
      duration,
      userId: this.userId,
      createdAt: moment().valueOf()
    });
  },

  'goals.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({_id});

    Goals.remove({_id, userId: this.userId});
  }

});
