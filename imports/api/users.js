import {Accounts} from 'meteor/accounts-base';
import SimplSchema from 'simpl-schema';

Accounts.validateNewUser((user) => {
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
});
