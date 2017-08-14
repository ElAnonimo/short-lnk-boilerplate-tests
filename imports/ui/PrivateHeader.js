import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {
  const onLogout = () => {
    // Accounts.logout();
    props.handleLogout();
  };

  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={onLogout.bind(this)}>Log out</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout()
  };
}, PrivateHeader);

// export default PrivateHeader;
