import React, {Component} from 'react';
import Header from './header';

import './style.scss';

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
