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
    fetch('/todo/register', {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json;charset=UTF-8'
	// 'Content-Type': 'application/x-www-form-urlencoded'  // 1. 这种方法也是可以的
      },
      body: JSON.stringify({
	username: 'Olive5',
	email: 'olive1@gmail.com',
	password: 'olive1'
      })
      // body: `userName=Olive&password=123&passwordAgain=123`  // 1. 这种方法也是可以的
    }).then(res => {
      if (res.status === 200) return res.json();
    }).then(resJson => {
      console.group('测试 POST 请求方式:');
      console.log('后台返回到前台的 JSON 数据:');
      console.log(resJson);
      console.groupEnd();
    }).catch(err => {
      console.log(err);
    });
  }
}

export default Register;
