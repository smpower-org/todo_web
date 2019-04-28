import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

class NoMath extends Component {
  render() {
    return (
      <div className="no-match-box">
	<div className="no-match">
	  <span>页面不见了，返回</span>&nbsp;
	  <Link to="home">首页</Link>
	</div>
      </div>
    );
  }

  componentDidMount() {
    console.log('404 page.');
  }
}

export default NoMath;

