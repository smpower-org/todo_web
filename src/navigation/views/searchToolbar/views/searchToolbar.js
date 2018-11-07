import React, {Component} from 'react';

import './style.css';

class SearchTollbar extends Component {
  render() {
    return (
      <div className="search-toolbar">
	<div className="search-menu-wrapper">
	  <i className="search-menu-icon"></i>
	</div>
	<div className="search-input-wrapper">
	  <input className="search-input" type="text" />
	</div>
	<div className="search-icon-wrapper">
	  <i className="search-icon"></i>
	</div>
      </div>
    );
  }
}

export default SearchTollbar;
