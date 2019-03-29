import React, { Component } from 'react';

import sortSvg from './images/sort.svg';
import moreSvg from './images/more.svg';

class Header extends Component {
  render() {
    return(
      <div className="content-header">
	<h1>收件箱</h1>
	<div className="action-bar">
	  <div className="action-bar-buttons">
	    <button className="sort hidden" onClick={this.onSort}>
	      <img src={sortSvg} alt="sort" />
	      <span>排序</span>
	    </button>
	    <button className="more" onClick={this.onMore}>
	      <img src={moreSvg} alt="more" />
	      <span>更多</span>
	    </button>
	  </div>
	  <div className="action-bar-content">
	  </div>
	</div>
      </div>
    );
  }

  onSort() {
    console.log('on sort...');
  }

  onMore() {
    console.log('on more...');
  }
}

export default Header;
