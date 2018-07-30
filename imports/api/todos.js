import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Todos = new Mongo.Collection('todos');

if (Meteor.isServer) {
  Meteor.publish('todos', function () {
    return Todos.find({ userId: this.userId });
  });
}

Meteor.methods({
  'todos.insert'(description, dueAt) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      description: {
        type: String,
        min: 1
      },
      dueAt: {
        type: Date,
        custom: function () {
          if (!moment().isBefore(this.value)) {
            return 'badDate';
          }
        }
      }
    }).validate({ description, dueAt});

    return Todos.insert({
      description,
      dueAt: moment(dueAt).valueOf(),
      userId: this.userId,
      done: false,
      createdAt: moment().valueOf()
    });
  },

  'todos.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Todos.remove({ _id, userId: this.userId });
  },

  'todos.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      description: {
        type: String,
        optional: true
      },
      dueAt: {
        type: String,
        optional: true
      },
      done: {
        type: Boolean,
        optional: true
      }
    }).validate({
      _id,
      ...updates
     });

     Todos.update({_id, userId: this.userId}, {
       $set: {
        updatedAt: moment().valueOf(),
        ...updates
       }
     });
  }
});
