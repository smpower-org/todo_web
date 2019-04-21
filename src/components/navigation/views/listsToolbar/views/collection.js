import React, { Component } from 'react';
import { setNavigationStatus } from '../../../actions';
import { actions as taskListActions } from '../../../../../content/';
import { actions as toggleTasklistVisibleActions } from '../../../../../components/toggleTasklistVisible/';
import PropTypes from 'prop-types';

class Collection extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onExtendNavigation = this.onExtendNavigation.bind(this);
    this.onToggleTaskChecked = this.onToggleTaskChecked.bind(this);

    const { dataTask } = this.props;
    let filterDataTask = dataTask.filter(item => {
      if (item.box !== 'inbox') {
	let uncompleted = 0;

	item.dataList.forEach(taskItem => {
	  if (!taskItem.completed) uncompleted++;
	});

	item.uncompleted = uncompleted;
	item.checked = false;

	return item;
      }

      let uncompleted = 0;

      item.dataList.forEach(taskItem => {
	if (!taskItem.completed) uncompleted++;
      });

      item.uncompleted = uncompleted;
      item.checked = true;

      return item;
    });

    this.state = Object.assign({}, {
      // default params
      filterDataTask
    }, this.getOwnState());
  }

  getOwnState() {
    return {
      navigation: this.context.store.getState().navigation,
      taskList: this.context.store.getState().taskList.data
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  onExtendNavigation() {
    this.context.store.dispatch(
      setNavigationStatus(!this.state.navigation.isNavigationExtended)
    );
  }

  onToggleTaskChecked(index) {
    const _this = this;
    const { filterDataTask } = this.state;

    return function(event) {
      const { updateCheckedStatus } = taskListActions;
      _this.context.store.dispatch(updateCheckedStatus(index));
      filterDataTask.forEach((item, index) => {
        item.checked = false;
      });
      filterDataTask.changed = true;

      filterDataTask[index].checked = !filterDataTask[index].checked;
      _this.setState({ filterDataTask });

      _this.context.store.dispatch(
        toggleTasklistVisibleActions.toggleTasklistVisible(false)
      );
    }
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
    const inboxClassName = 'lists-toolbar-filter-item inbox';
    const collectionClassName = 'lists-toolbar-collection-item';

    return (
      <ul className="lists-toolbar-group">
        {
	  isNavigationExtended ? (
	    // 导航展开时
	    filterDataTask.map((item, index) => {
	      if (item.box === 'inbox') {
		return (
		  <li 
		    className={item.checked ? `${inboxClassName} active` : `${inboxClassName}`} 
		    onClick={this.onToggleTaskChecked(index)}
		    key={index}>
		    <i className="lists-toolbar-filter-item-icon"></i>
		    <span className="lists-toolbar-filter-item-title">Inbox</span>
		    {
		      item.uncompleted === 0 ?
		        '' :
			<span className="lists-toolbar-filter-item-count">{item.uncompleted}</span>
		    }
		  </li>
		);
	      }

	      if (item.box !== 'inbox') {
		return (
		  <li 
		    className={item.checked ? `${collectionClassName} active` : `${collectionClassName}`} 
		    onClick={this.onToggleTaskChecked(index)}
		    key={index} >
		    <i className="lists-toolbar-collection-item-icon"></i>
		    <span className="lists-toolbar-collection-item-title">{item.box}</span>
		    {
		      item.uncompleted === 0 ?
		        '' :
			<span className="lists-toolbar-collection-item-count">{item.uncompleted}</span>
		    }
		  </li>
		);
	      }

	      return false;
	    })
	  ) : (
	    // 导航收起时
	    filterDataTask.map((item, index) => {
	      if (item.box === 'inbox') {
		return (
		  <li 
		    className={item.checked ? `${inboxClassName} active` : `${inboxClassName}`} 
		    onClick={this.onToggleTaskChecked(index)}
		    key={index}>
		    <i className="lists-toolbar-filter-item-icon"></i>
		    <span className="lists-toolbar-filter-item-title">Inbox</span>
		    <span className="lists-toolbar-filter-item-count">{item.uncompleted}</span>
		  </li>
		);
	      }

	      return false;
	    })
	  )
	}
	{
	  isNavigationExtended ? (
	    ''
	  ) : (
	    // 导航收起时显示【更多】按钮
	    <li className="more lists-toolbar-collection-item" onClick={this.onExtendNavigation}>
	      <i className="lists-toolbar-collection-item-icon-more"></i>
	    </li>
	  )
	}
      </ul>
    );
  }
}

Collection.contextTypes = {
  store: PropTypes.object
};

export default Collection;
