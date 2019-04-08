import React, { Component } from 'react';
import { setNavigationStatus } from '../../../actions';
import PropTypes from 'prop-types';

class Collection extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onExtendNavigation = this.onExtendNavigation.bind(this);

    const { dataTask } = this.props;
    let filterDataTask = dataTask.filter(item => {
      if (item.box !== 'inbox') {
	let uncompleted = 0;

	item.dataList.forEach(taskItem => {
	  if (!taskItem.completed) uncompleted++;
	});

	item.uncompleted = uncompleted;

	return item;
      }
    });

    this.state = Object.assign({}, {
      // default params
      filterDataTask
    }, this.getOwnState());
  }

  getOwnState() {
    return {
      navigation: this.context.store.getState().navigation
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {isNavigationExtended} = nextState.navigation;
    return this.state.navigation.isNavigationExtended !== isNavigationExtended;
  }

  onExtendNavigation() {
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
    const { isNavigationExtended } = this.state.navigation;
    const { filterDataTask } = this.state;

    return (
      <ul className="lists-toolbar-collection">
        {
	  filterDataTask.map((item, index) => (
	    <li className={isNavigationExtended ? "lists-toolbar-collection-item" : ""} key={index}>
	      <i className="lists-toolbar-collection-item-icon"></i>
	      <span className="lists-toolbar-collection-item-title">{item.box}</span>
	      <span className="lists-toolbar-collection-item-count">{item.uncompleted}</span>
	    </li>
	  ))
	}
      </ul>
    );
  }
}

Collection.contextTypes = {
  store: PropTypes.object
};

export default Collection;
