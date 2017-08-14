import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes';

if (Meteor.isServer) {
  describe("notes", function() {

    const noteOne = {
      _id: "test_noteId_1",
      title: "Meteor Notes",
      body: "The Notes app",
      userId: "test_userId_1",
      updatedAt: 0
    };

    const noteTwo = {
      _id: "test_noteId_2",
      title: "Places to visit",
      body: "Santa Elena",
      userId: "test_userId_2",
      updatedAt: 0
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it("should insert new note", function() {
      const userId = "testid";
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId: userId});

      expect(Notes.findOne({_id: _id, userId: userId})).toExist();
    });

    it("should not insert note from non authenticated user", function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it("should remove note", function() {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);
      // 2nd arg to apply() goes to 'notes.remove'() as arg: 'notes.remove'(noteOne._id)
      expect(Notes.findOne({_id: noteOne._id})).toNotExist();
    });

    it("should not remove note if user not authenticated", function() {
      // unauthedUserId = "test_unauthed_user";
      // Meteor.server.method_handlers['notes.remove'].apply({userId: unauthedUserId}, [noteOne._id]);
      // expect(Notes.findOne({_id: "noteOne._id})).toExist();

      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it("should not remove note if note's _id not provided", function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
      }).toThrow();
    });

    it("should update note", function() {
      const title = "Updated title";

      Meteor.server.method_handlers['notes.update'].apply(
        {userId: noteOne.userId},
        [ noteOne._id, {title: title} ]
      );
      expect(Notes.findOne({_id: noteOne._id})).toInclude({title: title, body: noteOne.body});
      expect(Notes.findOne({_id: noteOne._id}).updatedAt).toBeGreaterThan(0);
    });

    it("should throw Error if extra props on updates", function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply(
          {userId: noteOne.userId},
          [ noteOne._id, {title: title, extraProp: "extraProp"} ]
        );
      }).toThrow();
    });

    it("should not update note if user was not creator", function() {
      const title = "Updated title";

      Meteor.server.method_handlers['notes.update'].apply(
        {userId: "testid"},
        [ noteOne._id, {title: title} ]
      );
      expect(Notes.findOne({_id: noteOne._id})).toInclude(noteOne);
      // expect(Notes.findOne({_id: noteOne._id}).updatedAt).toBeGreaterThan(0);
    });

    it("should not update note if user was not authenticated", function() {
      expect(() => {
        Meteor.server.method_server['notes.update'].apply({}, [noteOne._id]);
      });
    });

    it("should not update note if note's _id not provided", function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId});
      }).toThrow();
    });

    it("should return a user's notes", function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it("should return no notes for a user that has none", function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: "testid"});
      const notes = res.fetch();

      expect(notes[0]).toEqual(undefined);
    });

  });
}
