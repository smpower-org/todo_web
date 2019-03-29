import React, {Component} from 'react';
import Header from './header';

import './style.css';

class Content extends Component {
  render() {
    return (
      <div className="content">
	<Header />
      </div>
    );
  }
}

export default Content;
