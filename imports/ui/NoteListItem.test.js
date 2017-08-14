import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount} from 'enzyme';
import moment from 'moment';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe("NodeListItem", function() {
    it("should render title and timestamp", function() {
      const _id = 12345;
      const title = "Bienvenidos";
      const updatedAt = 1502692642370;
      const wrapper = mount(<NoteListItem note={{_id: _id, title: title, updatedAt: updatedAt}} />);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe(_id + " - " + moment(updatedAt).format('DD.MM.YYYY HH:mm:ss'));
    });

    it ("should set default title if none provided", function() {
      const _id = 12345;
      const updatedAt = 1502692642370;
      const wrapper = mount(<NoteListItem note={{_id: _id, updatedAt: updatedAt}} />);

      expect(wrapper.find('h5').text()).toBe("Untitled");
      expect(wrapper.find('p').text()).toBe(_id + " - " + moment(updatedAt).format('DD.MM.YYYY HH:mm:ss'));
    });
  });
}
