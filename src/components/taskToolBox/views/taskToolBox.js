import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';

import completedSvg from './images/completed.svg';
import deleteSvg from './images/delete.svg';

import './style.scss';

class TaskToolBox extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setCompleted = this.setCompleted.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = Object.assign({}, {
      // default params
    }, this.getOwnState());
  }

  getOwnState() {
    const store = this.context.store;

    return {
      taskToolBox: store.getState().taskToolBox,
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  /**
    * @des 标记任务为完成状态
    *      1. 首先与后台服务通信，后台标记任务状态成功后，返回成功码 0
    *      2. 执行本地标记状态更新的 reducer
    *      3. 隐藏 TaskToolBox 模块
  **/
  setCompleted() {
    const store = this.context.store;

    console.log('set todo completed');
    alert('研发中...');

    // @TODO: 1. 后台通信，更新任务的标记状态

    // @TODO: 2. 通过 reducer 更新本地任务完成状态

    // @TODO: 3. 隐藏 TaskToolBox 模块
    store.dispatch(actions.hidden());
  }

  /**
    * @des 删除任务
    *      1. 与后台服务通信，后台删除任务成功后，返回状态码 0
    *      2. 执行本地删除操作 (reducer)
    *      3. 隐藏 TaskToolBox 模块
    * @TODO 增加批量删除功能
  **/
  deleteTodo() {
    const store = this.context.store;

    console.log('delete todo');
    alert('研发中...');

    // @TODO: 1. 后台通信，删除任务

    // @TODO: 2. 通过 reducer 删除本地对应的任务

    // @TODO: 3. 隐藏 TaskToolBox 模块
    store.dispatch(actions.hidden());
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
    const { style } = this.state.taskToolBox;

    return (
      <div className="task-tool-box" style={style} data-selector="task-tool-box">
	<ul data-selector="task-tool-box">
	  <li onClick={this.setCompleted} data-selector="task-tool-box">
	    <i data-selector="task-tool-box">
	      <img src={completedSvg} alt="标记为已完成" data-selector="task-tool-box" />
	    </i>
	    <span data-selector="task-tool-box">标记为已完成</span>
	  </li>
	  <li onClick={this.deleteTodo} data-selector="task-tool-box">
	    <i data-selector="task-tool-box">
	      <img src={deleteSvg} alt="删除任务" />
	    </i>
	    <span data-selector="task-tool-box">删除任务</span>
	  </li>
	</ul>
      </div>
    );
  }
}

TaskToolBox.contextTypes = {
  store: PropTypes.object
};

export default TaskToolBox;

