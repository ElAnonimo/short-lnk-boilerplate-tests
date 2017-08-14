import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {shallow} from 'enzyme';

import {Login} from './Login';

if (Meteor.isClient) {
  describe("Login", function() {

    it("should show error message", function() {
      const error = "test error message";
      const wrapper = shallow(<Login loginWithPassword={() => {}} />);

      wrapper.setState({error: error});
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: null});
      expect(wrapper.find('p').text()).toBe("No errors");
    });

    it("should call loginWithPassword() with the form data", function() {
      const email = "mikki@abc.com";
      const password = "parol";
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref('email').node.value = email;    // node to get html input element with ref='email'
      wrapper.ref('password').node.value = password;

      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({email: email});
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it("should set LoginWithPassword() callback errors", function() {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit');
      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error')).toBe(undefined);

      wrapper.find('form').simulate('submit');
      spy.calls[0].arguments[2]();
      expect(wrapper.state('error')).toBe(null);
    });

  });
}
