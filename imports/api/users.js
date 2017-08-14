import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import SimplSchema from 'simpl-schema';

export const validateNewUser = (user) => {
  const email = user.emails[0].address;

  new SimplSchema({
    email: {
      type: String,
      regEx: SimplSchema.RegEx.EmailWithTLD
    }
  }).validate({
    email: email
  });

  return true;
};

if (Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser);
}
