import React, {Component} from 'react';

import './style.css';

class Login extends Component {
  render() {
    return (
      <div className="main">
	<div className="login">
	  <div className="login-logo">
	    <i className="login-logo-icon"></i>
	  </div>
	  <div className="login-inner">
	    <div className="login-item login-email">
	      <i className="login-item-icon login-email-icon"></i>
	      <input
		type="text" 
		className="login-item-input login-email-input"
	      />
	      <span className="login-item-placeholder login-email-placeholder">
		Email
	      </span>
	    </div>
	    <div className="login-item login-password">
	      <i className="login-item-icon login-password-icon"></i>
	      <input 
		type="text" 
		className="login-item-input login-password-input"
	      />
	      <span className="login-item-placeholder login-password-placeholder">
		Password
	      </span>
	    </div>
	    <div className="login-item login-submit">
	      <button type="button" className="login-submit-signin">
	        Sign in
	      </button>
	    </div>
	    <div className="login-item login-link">
	      <a
		href="/#/findpwd" 
		className="login-link-item login-link-forgot">
		Forgot your password?
	      </a>
	      <a 
		href="/#/register" 
		className="login-link-item login-link-register">
	        Create Account
	      </a>
	    </div>
	  </div>
	</div>
      </div>
    );
  }
}

export default Login;
