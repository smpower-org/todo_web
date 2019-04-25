import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.css';

class SearchTollbar extends Component {
  render() {
    // @TODO 下一版研发该模块
    //       显示搜索输入框和搜索按钮，研发搜索功能
    return (
      <div className="search-toolbar">
	<div className="search-menu-wrapper">
	  <i className="search-menu-icon" onClick={this.props.onClickMenuBtn}></i>
	</div>
	<div className="search-input-wrapper">
	  <input className="search-input" type="text" style={{
	    color: 'transparent',
	    cursor: 'default'
	  }} />
	</div>
	<div className="search-icon-wrapper" style={{
	  opacity: '0',
	  cursor: 'default'
	}}>
	  <i className="search-icon"></i>
	</div>
      </div>
    );
  }
}

SearchTollbar.propTypes = {
  onClickMenuBtn: PropTypes.func.isRequired
};

export default SearchTollbar;
