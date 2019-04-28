import React from 'react';
import { Link } from 'react-router-dom';
import {view as TipBox} from '../../components/tipBox/';

const Register = ({
  onNameInputChange, onEmailInputChange, onPasswordInputChange,
  nameInputValue, emailInputValue, passwordInputValue,
  nameInputErrorMsg, emailInputErrorMsg, passwordInputErrorMsg,
  onSubmit
}) => (
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
	    onChange={onNameInputChange}
	    value={nameInputValue}
	  />
	  <div className={nameInputErrorMsg === '' ? "register-item-tip register-name-tip" : "register-item-tip register-name-tip active"}>
	    <TipBox value={nameInputErrorMsg} />
	  </div>
	</div>
	<div className="register-item register-email">
	  <i className="register-item-icon register-email-icon"></i>
	  <input
	    type="text"
	    className="register-item-input register-email-input"
	    placeholder="Email" 
	    onChange={onEmailInputChange}
	    value={emailInputValue}
	  />
	  <div className={emailInputErrorMsg === '' ? "register-item-tip register-email-tip" : "register-item-tip register-email-tip active"}>
	    <TipBox value={emailInputErrorMsg} />
	  </div>
	</div>
	<div className="register-item register-password">
	  <i className="register-item-icon register-password-icon"></i>
	  <input
	    type="password"
	    className="register-item-input register-password-input"
	    placeholder="Password" 
	    onChange={onPasswordInputChange}
	    value={passwordInputValue}
	  />
	  <div className={passwordInputErrorMsg === '' ? "register-item-tip register-password-tip" : "register-item-tip register-password-tip active"}>
	    <TipBox value={passwordInputErrorMsg} />
	  </div>
	</div>
	<div className="register-item register-submit">
	  <button 
	    type="button" 
	    className="register-submit-btn" 
	    onClick={onSubmit}>Create Free Account
	  </button>
	</div>
      </div>
      <div className="register-login">
	<span className="register-login-text">
	  Have an account already? 
	  <Link
	    to="./login"
	    className="login-link-item login-link-forgot"
	  >Sign in</Link>
	</span>
      </div>
    </div>
  </div>
);

export default Register;
