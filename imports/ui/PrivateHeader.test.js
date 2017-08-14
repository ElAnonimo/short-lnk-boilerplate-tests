import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient) {
  describe("PrivateHeader", function() {

    it("should set button text to 'Log out'", function() {
      const wrapper = mount(<PrivateHeader title="Header" handleLogout={() => {}} />);
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Log out');
    });

    it("should use title prop as h1 text", function() {
      const title = "Test title here";
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}} />);
      const buttonText = wrapper.find('h1').text();

      expect(buttonText).toBe(title);
    });

    it("should call the function", function() {
      const spy = expect.createSpy();
      spy(12345, "para");
      spy({item: "name"});
      // debugger;
      // expect(spy).toNotHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(12345, "para");
      expect(spy).toHaveBeenCalledWith({item: "name"});
    });

    it("should call handleLogout() on click", function() {
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title="Titulado" handleLogout={spy} />);

      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

  });
}
