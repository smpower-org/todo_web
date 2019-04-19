import React, {Component} from 'react';
import { actions as userboxActions } from '../../../../userBox/';
import { actions as taskToolBoxActions } from '../../../../taskToolBox/';
import PropTypes from 'prop-types';

import './style.scss';

class UserToolbar extends Component {
  constructor() {
    super(...arguments);
    this.onClickUser = this.onClickUser.bind(this);
  }

  onClickUser() {
    const { isUserboxExtended } = this.context.store.getState().userbox;

    if (isUserboxExtended) {
      this.context.store.dispatch(
        userboxActions.hide()
      );
    } else {
      this.context.store.dispatch(
        userboxActions.visible()
      );
    }

    // 隐藏任务功能弹框
    this.context.store.dispatch(
      taskToolBoxActions.hidden()
    );
  }

  render() {
    const taskList = this.context.store.getState().taskList;
    const { isUserboxExtended } = this.context.store.getState().userbox;

    return (
      <div className="user-toolbar" data-selector="user-toolbar">
	<div className="user" data-selector="user-toolbar" onClick={this.onClickUser} >
	  <i className="user-avatar" data-selector="user-toolbar"></i>
	  {
	    taskList.status === 0 ? (
	      <span className="user-name" data-selector="user-toolbar">{taskList.username}</span>
	    ) : (
	      taskList.status === 'loading' ? (
		<span className="user-name" data-selector="user-toolbar">loading...</span>
	      ) : (
		<span className="user-name" data-selector="user-toolbar">error...</span>
	      )
	    )
	  }
	  <i className={isUserboxExtended ? 'user-arrow-icon active' : 'user-arrow-icon'} data-selector="user-toolbar"></i>
	  <span className="sync" data-selector="user-toolbar"></span>
	</div>
	<div className="stream-counts">
	  <i className="bell-icon"></i>
	  <i className="conversation-icon"></i>
	</div>
      </div>
    );
  }
}

UserToolbar.contextTypes = {
  store: PropTypes.object
};

export default UserToolbar;
