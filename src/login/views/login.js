import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({
  onEmailInputFocus, onEmailInputBlur, 
  onEmailInputChange, emailInputValue, emailPlaceholderClass,
  onPasswordInputFocus, onPasswordInputBlur, 
  onPasswordInputChange, passwordInputValue, passwordPlaceholderClass,
  onSignin
}) => (
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
	    autoFocus
	    className="login-item-input login-email-input"
	    onFocus={onEmailInputFocus}
	    onBlur={onEmailInputBlur}
	    onChange={onEmailInputChange}
	    value={emailInputValue}
	  />
	  <span className={"login-item-placeholder login-email-placeholder "+ emailPlaceholderClass}>
	    Email
	  </span>
	</div>
	<div className="login-item login-password">
	  <i className="login-item-icon login-password-icon"></i>
	  <input 
	    type="password" 
	    className="login-item-input login-password-input"
	    onFocus={onPasswordInputFocus}
	    onBlur={onPasswordInputBlur}
	    onChange={onPasswordInputChange}
	    value={passwordInputValue}
	  />
	  <span className={"login-item-placeholder login-password-placeholder " + passwordPlaceholderClass}>
	    Password
	  </span>
	</div>
	<div className="login-item login-submit">
	  <button type="button" className="login-submit-signin" onClick={onSignin}>
	    Sign in
	  </button>
	</div>
	<div className="login-item login-link">
	  <Link
	    to="./findpwd"
	    className="login-link-item login-link-forgot"
	  >Forgot your password?</Link>
	  <Link
	    to="./register"
	    className="login-link-item login-link-register"
	  >Create Account</Link>
	</div>
      </div>
    </div>
  </div>
);

export default Login;
