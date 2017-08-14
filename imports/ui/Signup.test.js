import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {shallow} from 'enzyme';

import {Signup} from './Signup';

if (Meteor.isClient) {
  describe("Signup", function() {

    it("should show error message", function() {
      const error = "test error message";
      const wrapper = shallow(<Signup createUser={() => {}} />);

      wrapper.setState({error: error});
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: null});
      expect(wrapper.find('p').text()).toBe("No errors");
    });

    it("should call createUser() with the form data", function() {
      const email = "mikki@abc.com";
      const password = "parol";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;    // node to get html input element with ref='email'
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({email: email, password: password});
    });

    it("should set error if password shorter than 5 chars", function() {
      const email = "mikki@abc.com";
      const password = "parl";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;    // node to get html input element with ref='email'
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error')).toBe('Password must be more than 5 characters');
      expect(wrapper.state('error').length).toBeGreaterThan(0);
    });

    it("should set createUser() callback errors", function() {
      const password = "parol";
      const message = "hi there";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      spy.calls[0].arguments[1]({message: message});
      expect(wrapper.state('error')).toBe(message);
    })

  });
}
