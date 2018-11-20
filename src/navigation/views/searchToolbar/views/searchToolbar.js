import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.css';

class SearchTollbar extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div className="search-toolbar">
	<div className="search-menu-wrapper">
	  <i className="search-menu-icon" onClick={this.props.onClickMenuBtn}></i>
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

SearchTollbar.propTypes = {
  onClickMenuBtn: PropTypes.func.isRequired
};

export default SearchTollbar;
