import React from 'react';
import {withRouter} from 'react-router-dom';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

const MyLink = (props) => {
  const navigate = (evt) => {
    evt.preventDefault();
    props.history.push('/notfound');
  };

  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <button className="button" onClick={navigate.bind(this)}>Go to Not Found page</button>
        dashboard page content
        <NoteList />
      </div>
    </div>
  );
};

export default withRouter(MyLink);
