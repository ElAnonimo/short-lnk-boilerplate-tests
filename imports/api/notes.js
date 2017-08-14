import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimplSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function() {
    return Notes.find({userId: this.userId});
  });
}

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error("not authorized");
    }

    return Notes.insert({
      title: null,
      body: null,
      userId: this.userId,
      updatedAt: moment().valueOf()
      // updatedAt: new Date().getTime()
    });
  },
  'notes.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error("not authorized");
    }

    new SimplSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({_id: _id});

    Notes.remove({_id: _id, userId: this.userId});
  },
  'notes.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error("not authorized");
    }

    new SimplSchema({
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
    }).validate({_id: _id, ...updates});
    // spread operator ... ads only properties from updates. Any other properties will throw Error
    // properties from updates (title, body) are defined in SimplSchema

    Notes.update({_id: _id, userId: this.userId}, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});
