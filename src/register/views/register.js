import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {regist} from '../actions';

import './style.css';

class Register extends Component {
  constructor() {
    super(...arguments);

    this.onChange = this.onChange.bind(this);
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nameInputValue: '',
      emailInputValue: '',
      passwordInputValue: ''
    };
  }

  onChange() {
    const {status, isRegisted} = this.context.store.getState().register;

    if (status === 'success' && isRegisted) this.props.history.push('/login');
  }

  onNameInputChange(event) {
    this.setState({
      nameInputValue: event.target.value.trim()
    });
  }

  onEmailInputChange(event) {
    this.setState({
      emailInputValue: event.target.value.trim()
    });
  }

  onPasswordInputChange(event) {
    this.setState({
      passwordInputValue: event.target.value.trim()
    });
  }

  onSubmit() {
    this.context.store.dispatch(regist(
      this.state.nameInputValue,
      this.state.emailInputValue,
      this.state.passwordInputValue
    ));
  }

  render() {
    return (
      <div className="main">
	<div className="register">
	  <div className="register-logo">
	    <i className="register-logo-icon"></i>
	    <h1 className="register-logo-title">Get Wundertodo For Free</h1>
	  </div>
	  <div className="register-inner">
	    <div className="register-item register-name">
	      <i className="register-item-icon register-name-icon"></i>
	      <input
		type="text"
		className="register-item-input register-name-input"
		placeholder="Name" 
		onChange={this.onNameInputChange}
		value={this.state.nameInputValue}
	      />
	    </div>
	    <div className="register-item register-email">
	      <i className="register-item-icon register-email-icon"></i>
	      <input
		type="text"
		className="register-item-input register-email-input"
		placeholder="Email" 
		onChange={this.onEmailInputChange}
		value={this.state.emailInputValue}
	      />
	    </div>
	    <div className="register-item register-password">
	      <i className="register-item-icon register-password-icon"></i>
	      <input
		type="password"
		className="register-item-input register-password-input"
		placeholder="Password" 
		onChange={this.onPasswordInputChange}
		value={this.state.passwordInputValue}
	      />
	    </div>
	    <div className="register-item register-submit">
	      <button type="button" className="register-submit-btn" onClick={this.onSubmit}>
	        Create Free Account
	      </button>
	    </div>
	  </div>
	  <div className="register-login">
	    <span className="register-login-text">
	      Have an account already? 
	      <a href="/#/login">Sign in</a>
	    </span>
	  </div>
	</div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe()
  }
}

Register.contextTypes = {
  store: PropTypes.object
};

export default Register;
