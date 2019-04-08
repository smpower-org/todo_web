import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {setNavigationStatus} from '../actions';
import {view as SearchToolbar} from './searchToolbar/';
import {view as UserToolbar} from './userToolbar/';
import {view as ListsToolbar} from './listsToolbar/';
import {view as CreateToolbar} from './createToolbar/';

import './style.css';

class Navigation extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickMenuBtn = this.onClickMenuBtn.bind(this);

    this.state = this.getOwnState();
  }

  getOwnState() {
    return {
      navigation: this.context.store.getState().navigation
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  onClickMenuBtn() {  // 切换 navigation 状态(展开或收起)
    this.context.store.dispatch(
      setNavigationStatus(!this.state.navigation.isNavigationExtended)
    );
  }

  componentDidMount() {
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe(this.onChange);
  }

  render() {
    const {isNavigationExtended} = this.state.navigation;

    return (
      <div className={isNavigationExtended ? "navigation active" : "navigation"}>
	<div className="navigation-inner">
	  <SearchToolbar 
	    onClickMenuBtn={this.onClickMenuBtn}
	  />
	  <UserToolbar />
	  <ListsToolbar />
	  <CreateToolbar />
	</div>
      </div>
    );
  }
}

Navigation.contextTypes = {
  store: PropTypes.object
};

export default Navigation;
