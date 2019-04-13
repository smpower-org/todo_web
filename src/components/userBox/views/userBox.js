import React, { Component } from 'react';

import './style.scss';

class UserBox extends Component {
  sync() {
    alert('研发中...');
  }

  setting() {
    alert('研发中...');
  }

  changeBackground() {
    alert('研发中...');
  }

  logout() {
    alert('研发中...');
  }

  render() {
    return (
      <div className="user-box">
	<div className="menu">
	  <ul>
	    <li className="last-sync-time">
	      最后同步：
	      <span>29 分钟之前</span>
	    </li>
	    <li className="sync" onClick={this.sync}>立即同步</li>
	    <li className="setting" onClick={this.setting}>账户设置</li>
	    <li className="chbg" onClick={this.changeBackground}>更换背景</li>
	    <li className="logout" onClick={this.logout}>登出</li>
	  </ul>
	</div>
      </div>
    );
  }
}

export default UserBox;

