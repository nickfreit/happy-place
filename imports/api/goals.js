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
  'goals.insert'(description, duration, durType) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      description: {
        type: String,
        min: 1
      },
      duration: {
        type: SimpleSchema.Integer,
        min: 1
      },
      durType: {
        type: String,
        min: 1
      }
    }).validate({ description, duration, durType });

    return Goals.insert({
      description,
      duration,
      durType,
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
  },

  'goals.update'(_id, task) {
    Goals.update({_id, userId: this.userId}, {
      $addToSet: {
        tasks: task
      }
    });
  },

  'goals.updateTaskComplete'(_id, task_id) {
    Goals.update(
      { _id, userId: this.userId, 'tasks._id' : task_id },
      { $inc: { "tasks.$.complete": 1 } }
    );
  },

  'goals.updateTaskSkip'(_id, task_id) {
    Goals.update(
      { _id, userId: this.userId, 'tasks._id' : task_id },
      { $inc: { "tasks.$.skip": 1 } }
    );
  }
});
