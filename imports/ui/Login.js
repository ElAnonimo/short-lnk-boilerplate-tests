import React from 'react';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

import {routes} from '../routes/routes';

export class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {error: null};
  }

  onSubmit(evt) {
    evt.preventDefault();

    let email = this.refs.email.value;
    let password = this.refs.password.value;

    this.props.loginWithPassword({email: email}, password, (err) => {
      if (err) {
        this.setState({error: err.message});
      } else {
        this.setState({error: null});
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login page</h1>
          <p>{this.state.error ? this.state.error : "No errors"}</p>
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Log in</button>
          </form>
          {/*<Link to="/signup">Have an account?</Link>*/}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login);
