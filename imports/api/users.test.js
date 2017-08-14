import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {validateNewUser} from './users';

if (Meteor.isServer) {
  describe("users", function() {
    it("should allow valid e-mail add", function() {
      const testUser = {emails: [{address: "testuser@abc.com"}]};
      expect(validateNewUser(testUser)).toBe(true);
    });

    it("should reject invalid e-mail", function() {
      const testInvalidEmail = {emails: [{address: "inv_email@abc."}]};
      expect(() => {
        validateNewUser(testInvalidEmail);
      }).toThrow();
    });
  });
}

/*const add = (a, b) => {
  if (typeof b !== 'number') {
    return a + a;
  }

  return a + b;
};

const square = (a) => a * a;

describe("adds and squares values", function() {
  it("should add two numbers", function() {
    const res = add(11, 9);
    expect(res).toBe(20);
    /!*if (res !== 20) {
      throw new Error("not the expected sum");
    }*!/
  });

  it("multiplies a value by itself", function() {
    const res = square(5);
    expect(res).toBe(25);
    /!*if (res !== 25) {
      throw new Error("it didn't do square");
    }*!/
  });
});

describe("adds a value to itself", function() {
  it("should double a single number", function() {
    const res = add(5);
    if (res !== 10) {
      throw new Error("it didn't double the single value");
    }
  });
});*/
