import React, { Component } from 'react';
import { view as Content } from '../../content/';
import { view as Navigation } from '../../components/navigation/';

import './style.scss';

class Home extends Component {
  render() {
    return (
      <div class="main">
	<Navigation />
	<Content />
      </div>
    );
  }
}

export default Home;
