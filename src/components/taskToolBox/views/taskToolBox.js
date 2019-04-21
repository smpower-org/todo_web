import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { actions as deleteTodoActions } from '../../deleteTodo/';
import { actions as toggleTodoCheckedActions } from '../../toggleTodoChecked/';
import { actions as contentActions } from '../../../content/';

import completedSvg from './images/completed.svg';
import deleteSvg from './images/delete.svg';

import './style.scss';

class TaskToolBox extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getSelectedTodos = this.getSelectedTodos.bind(this);
    this.setCompleted = this.setCompleted.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = Object.assign({}, {
      // default params
      uid: parseInt(window.sessionStorage.getItem('uid'), 10),
      token: window.sessionStorage.getItem('token')
    }, this.getOwnState());
  }

  getOwnState() {
    const store = this.context.store;

    return {
      taskToolBox: store.getState().taskToolBox,
      deleteTodo: store.getState().deleteTodo,
      toggleTodoChecked: store.getState().toggleTodoChecked,
      taskList: store.getState().taskList
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  /**
    * @des 获取被选中的 todo
    * @return selectedTodos [Array] - 数组元素为对象类型 {listId, taskId}, ...
  **/
  getSelectedTodos() {
    const taskList = this.state.taskList.data;
    let selectedTodo = {};
    let selectedTodos = [];

    taskList.forEach((listItem, listIndex) => {
      listItem.dataList.forEach((taskItem, taskIndex) => {
        if (taskItem.selected) {
	  selectedTodo.listId = listItem.id;
	  selectedTodo.taskId = taskItem.id;
	  selectedTodos.push(selectedTodo);
	}
      });
    });

    return selectedTodos;
  }

  /**
    * @des 标记任务为完成状态
    *      1. 首先与后台服务通信，后台标记任务状态成功后，返回成功码 0
    *      2. 执行本地标记状态更新的 reducer
    *      3. 隐藏 TaskToolBox 模块
  **/
  setCompleted() {
    const { uid, token } = this.state;
    const selectedTodos = this.getSelectedTodos();

    this.context.store.dispatch(actions.hidden());
    this.context.store.dispatch(contentActions.completeTodo(selectedTodos));
    this.context.store.dispatch(
      toggleTodoCheckedActions.complete(uid, selectedTodos, token)
    );
  }

  /**
    * @des 删除任务
    * @TODO 增加批量删除功能
  **/
  deleteTodo() {
    const { uid, token } = this.state;
    const selectedTodos = this.getSelectedTodos();

    this.context.store.dispatch(actions.hidden());
    this.context.store.dispatch(
      deleteTodoActions.deleteTodo(uid, selectedTodos, token)
    );
  }

  componentDidUpdate() {
    const store = this.context.store;
    const { deleteTodo, toggleTodoChecked } = this.state;

    if (deleteTodo.status === 0) {
      // 重置删除 todo 网络状态
      store.dispatch(deleteTodoActions.reset());
    }

    if (toggleTodoChecked.status === 0) {
      store.dispatch(toggleTodoCheckedActions.reset());
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
    const { top, left } = this.state.taskToolBox.style;
    const pageWidth = document.documentElement.getBoundingClientRect().width;
    const pageHeight = document.documentElement.getBoundingClientRect().height;
    const refs = this.refs;

    let style = {
      width: '200px',
      top,
      left
    };

    // 计算弹框在页面上的位置
    if (typeof this.refs.taskToolBox !== 'undefined') {
      const taskToolBoxWidth = refs.taskToolBox.getBoundingClientRect().width;
      const taskToolBoxHeight = refs.taskToolBox.getBoundingClientRect().height;

      style = {
	width: '200px',
	top: (parseInt(top.split('px')[0], 10) + taskToolBoxHeight) > pageHeight ? (
	  parseInt(top.split('px')[0], 10) - taskToolBoxHeight + 'px'
	) : (
	  top
	),
	left: (parseInt(left.split('px')[0], 10) + taskToolBoxWidth) > pageWidth ? (
	  parseInt(left.split('px')[0], 10) - taskToolBoxWidth + 'px'
	) : (
	  left
	)
      };
    }

    return (
      <div className="task-tool-box" style={style} data-selector="task-tool-box" ref="taskToolBox">
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

