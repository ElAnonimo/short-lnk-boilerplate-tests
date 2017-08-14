import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
  let i = 0;

  return (
    <div>
      <NoteListHeader />
      <br />
      NoteList {props.notes.length}
      {props.notes.map((note) => {
        return (
          <div>
            {++i}
            <NoteListItem key={note._id} note={note} />
          </div>
        );
      })}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);
