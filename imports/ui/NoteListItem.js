import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const NoteListItem = (props) => {
  return (
    <div>
      <h5>{props.note.title || "Untitled"}</h5>
      <p>{props.note._id} - {moment(props.note.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteListItem;
