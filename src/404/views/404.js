import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

class NoMath extends Component {
  render() {
    return (
      <div className="no-match">
	<p>
	  页面不见了，返回
	</p>
	<Link to="/home">首页</Link>
	<span ref="s"></span>
      </div>
    );
  }

  componentDidMount() {
    console.log('404 page.');
  }
}

export default NoMath;

