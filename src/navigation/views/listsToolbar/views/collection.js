import React, { Component } from 'react';
import { setNavigationStatus } from '../../../actions';
import PropTypes from 'prop-types';

class Collection extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onExtendNavigation = this.onExtendNavigation.bind(this);

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

  shouldComponentUpdate(nextState, nextProps) {
    const {isNavigationExtended} = nextProps.navigation;
    return this.state.navigation.isNavigationExtended !== isNavigationExtended;
  }

  onExtendNavigation() {
    this.context.store.dispatch(
      setNavigationStatus(!this.state.navigation.isNavigationExtended)
    );
  }

  render() {
    const {isNavigationExtended} = this.state.navigation;
    return (
      <ul className="lists-toolbar-collection">
	<li className={isNavigationExtended ? "lists-toolbar-collection-item" : ""}>
	  <i className="lists-toolbar-collection-item-icon"></i>
	  <span className="lists-toolbar-collection-item-title">test list 1</span>
	  <span className="lists-toolbar-collection-item-count">2</span>
	</li>
	<li className={isNavigationExtended ? "lists-toolbar-collection-item" : ""}>
	  <i className="lists-toolbar-collection-item-icon"></i>
	  <span className="lists-toolbar-collection-item-title">test list 2</span>
	  <span className="lists-toolbar-collection-item-count">4</span>
	</li>
	<li className={isNavigationExtended ? "lists-toolbar-collection-item" : ""}>
	  <i className="lists-toolbar-collection-item-icon"></i>
	  <span className="lists-toolbar-collection-item-title">test list 2</span>
	  <span className="lists-toolbar-collection-item-count">7</span>
	</li>
	<li className={isNavigationExtended ? "" : "lists-toolbar-collection-item"} 
	  onClick={this.onExtendNavigation}>
	  <i className="lists-toolbar-collection-item-icon-more"></i>
	</li>
      </ul>
    );
  }

  componentDidMount() {
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe();
  }
}

Collection.contextTypes = {
  store: PropTypes.object
};

Collection.contextTypes = {
  store: PropTypes.object
};

export default Collection;
