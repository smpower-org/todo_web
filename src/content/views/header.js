import React, { Component } from 'react';

import sortSvg from './images/sort.svg';
import moreSvg from './images/more.svg';
import copySvg from './images/copy.svg';

class Header extends Component {
  render() {
    return(
      <div className="content-header">
	<h1>收件箱</h1>
	<div className="action-bar">
	  <div className="action-bar-buttons">
	    <button className="sort hidden" onClick={this.onSort}>
	      <img src={sortSvg} alt="排序" />
	      <span>排序</span>
	    </button>
	    <button className="more" onClick={this.onMore}>
	      <img src={moreSvg} alt="更多" />
	      <span>更多</span>
	    </button>
	  </div>
	  <div className="action-bar-content">
	    <ul className="more">
	      <li>
		<a href="#">
		  <img src={copySvg} alt="复制" />
		  <span>复制清单</span>
		</a>
	      </li>
	    </ul>
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
