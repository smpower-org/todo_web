import React, {Component} from 'react';

import './style.css';

class Register extends Component {
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
	      />
	    </div>
	    <div className="register-item register-email">
	      <i className="register-item-icon register-email-icon"></i>
	      <input
		type="text"
		className="register-item-input register-email-input"
		placeholder="Email" 
	      />
	    </div>
	    <div className="register-item register-password">
	      <i className="register-item-icon register-password-icon"></i>
	      <input
		type="text"
		className="register-item-input register-password-input"
		placeholder="Password" 
	      />
	    </div>
	    <div className="register-item register-submit">
	      <button type="button" className="register-submit-btn">
	        Create Free Account
	      </button>
	    </div>
	  </div>
	</div>
      </div>
    );
  }
}

export default Register;
