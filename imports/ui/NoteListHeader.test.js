import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount} from 'enzyme';

import {NoteListHeader} from './NoteListHeader';

if (Meteor.isClient) {
  describe("NodeListHeader", function() {
    it("button click calls 'notes.insert'()", function() {
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);

      wrapper.find('button').simulate('click');

      expect(spy.calls[0].arguments[0]).toBe('notes.insert');
      expect(spy).toHaveBeenCalledWith('notes.insert');
    });
  });
}
