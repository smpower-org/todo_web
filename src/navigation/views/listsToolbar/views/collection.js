import React, {Component} from 'react';

class Collection extends Component {
  render() {
    return (
      <ul className="lists-toolbar-collection">
	<li className="lists-toolbar-collection-item">
	  <i className="lists-toolbar-collection-item-icon"></i>
	  <span className="lists-toolbar-collection-item-title">test list 1</span>
	  <span className="lists-toolbar-collection-item-count">2</span>
	</li>
	<li className="lists-toolbar-collection-item">
	  <i className="lists-toolbar-collection-item-icon"></i>
	  <span className="lists-toolbar-collection-item-title">test list 2</span>
	  <span className="lists-toolbar-collection-item-count">4</span>
	</li>
	<li className="lists-toolbar-collection-item">
	  <i className="lists-toolbar-collection-item-icon"></i>
	  <span className="lists-toolbar-collection-item-title">test list 2</span>
	  <span className="lists-toolbar-collection-item-count">7</span>
	</li>
      </ul>
    );
  }
}

export default Collection;
