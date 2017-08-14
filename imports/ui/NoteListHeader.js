import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {
  onClick = (evt) => {
    evt.preventDefault();
    props.meteorCall('notes.insert');
  };

  return (
    <button onClick={onClick.bind(this)}>Create a note</button>
  );
};

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);
