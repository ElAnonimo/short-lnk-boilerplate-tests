import {Meteor} from 'meteor/meteor';
import SimplSchema from 'simpl-schema';

SimplSchema.defineValidationErrorTransform((error) => {
  return new Meteor.Error(400, error.message);
});
