import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addTodo, selectTodo, deleteTodo, completeTodo, uncompleteTodo } from '../actions';
import { actions as addTodoActions } from '../../components/addTodo/';
import { actions as deleteTodoActions } from '../../components/deleteTodo/';
import { actions as toggleTodoCheckedActions } from '../../components/toggleTodoChecked/';
import { actions as toggleTasklistVisibleActions } from '../../components/toggleTasklistVisible/';
import { actions as userboxActions } from '../../components/userBox/';
import { actions as taskToolBoxActions } from '../../components/taskToolBox/';

import addSvg from './images/add.svg';
import calendarSvg from './images/calendar.svg';
import starBorderSvg from './images/star-border.svg';
import starWhiteSvg from './images/star-white.svg';
import checkboxNonSvg from './images/checkbox-non.svg';
import checkboxCheckedSvg from './images/checkbox-checked.svg';

class Tasks extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.clearAddTodoVal = this.clearAddTodoVal.bind(this);
    this.onShowCompleted = this.onShowCompleted.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.onShowTaskBox = this.onShowTaskBox.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleSelectTodo = this.handleSelectTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.uncompleteTodo = this.uncompleteTodo.bind(this);

    this.state = Object.assign({}, {
      // true - 显示默认右键菜单 | false - 隐藏默认右键菜单
      isContextMenuVisible: true
    }, this.getOwnState());
  }

  getOwnState() {
    const store = this.context.store;

    return {
      taskList: store.getState().taskList,
      addTodo: store.getState().addTodo,
      deleteTodo: store.getState().deleteTodo,
      toggleTodoChecked: store.getState().toggleTodoChecked,
      toggleTasklistVisible: store.getState().toggleTasklistVisible,
      taskToolBox: store.getState().taskToolBox
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  handleOnFocus() {
    document.addEventListener('keydown', this.handleEnterKey, false);
  }

  handleEnterKey(event) {
    if (event.keyCode === 13) {
      const token = window.sessionStorage.getItem('token');
      const uid = parseInt(window.sessionStorage.getItem('uid'), 10);
      const target = event.target;
      const dataList = this.state.taskList.data;
      let list_id = 0;

      if (target.value.trim() === '') return;

      // 与服务器通信，添加一条 todo
      dataList.forEach((item, index) => {
        if (item.checked) list_id = item.id;
      });

      this.context.store.dispatch(
        addTodoActions.addTodo(uid, list_id, target.value.trim(), token)
      );

      this.setState({
        inputElement: target,
	addedTodoVal: target.value.trim()
      });
    }
  }

  clearAddTodoVal() {
    const { inputElement } = this.state;
    inputElement.value = '';
  }

  onShowCompleted() {
    const { isTasklistVisible } = this.state.toggleTasklistVisible;

    this.context.store.dispatch(
      toggleTasklistVisibleActions.toggleTasklistVisible(!isTasklistVisible)
    );
  }

  toggleChecked(listId, taskId, clickedType) {
    const _this = this;
    return function(event) {
      const token = window.sessionStorage.getItem('token');
      const uid = parseInt(window.sessionStorage.getItem('uid'), 10);

      _this.context.store.dispatch(
        toggleTodoCheckedActions.toggleTodoChecked(listId, taskId, uid, token)
      );

      _this.setState({
	listId, taskId
      });
    }
  }

  onShowTaskBox(listId, taskId) {
    const _this = this;
    const store = this.context.store;

    return function(event) {
      // 按下鼠标右键
      if (event.button === 2) {
	const { pageX, pageY } = event;
	const taskList = _this.state.taskList.data;

	_this.setState({
	  isContextMenuVisible: false
	});

	// @TODO: Task #19 研发任务功能弹框 / 编写任务弹框模块
	// ...

	store.dispatch(taskToolBoxActions.visible({
	  top: `${pageY}px`,
	  left: `${pageX}px`
	}));

	store.dispatch(userboxActions.hide());

	// @TODO 选中当前任务项
	taskList.forEach((listItem, listIndex) => {
	  if (listId === listItem.id) {
	    listItem.dataList.forEach((taskItem, taskIndex) => {
	      if (taskId === taskItem.id) {
	        if (!taskItem.selected) {
		  store.dispatch(
		    selectTodo([
		      { listId, taskId }
		    ])
		  );
		}
	      }
	    });
	  }
	});
      }
    }
  }

  handleContextMenu(event) {
    const { isContextMenuVisible } = this.state;

    if (!isContextMenuVisible) event.preventDefault();

    // 鼠标右键点击任务项功能菜单时，屏蔽浏览器默认的上下文菜单
    switch(event.target.getAttribute('data-selector')) {
      case 'task-tool-box':
        event.preventDefault();
	break;
      default:
        break;
    }

    this.setState({
      isContextMenuVisible: true
    });
  }

  handleSelectTodo(listId, taskId) {
    const _this = this;
    const store = this.context.store;

    return function(event) {
      const isAltKey = event.altKey;
      const isCtrlKey = event.ctrlKey;
      const taskList = _this.state.taskList.data;
      const { isTaskToolBoxVisible } = _this.state.taskToolBox;

      // 选择一个任务项
      if (!isAltKey && !isCtrlKey) {
        // 任务功能弹框处于显示状态下，点击当前被选中的元素隐藏任务功能弹框，
	// 但是不会取消已选中的任务项
        if (isTaskToolBoxVisible) {
	  // 下一次点击的任务项不是已选中的任务项，更新任务项的选中状态
	  taskList.forEach((listItem, listIndex) => {
	    if (listId === listItem.id) {
	      listItem.dataList.forEach((taskItem, taskIndex) => {
	        if (taskId !== taskItem.id) {
		  if (taskItem.selected) {
		    store.dispatch(selectTodo([
		      { listId, taskId }
		    ]));
		  }
		}
	      });
	    }
	  });
	}

	// 任务功能弹框处于隐藏状态下，点击当前被选中的元素，切换任务项的选中
	// 状态
	else {
	  store.dispatch(selectTodo([
	    { listId, taskId }
	  ]));
	}
      }

      // @TODO: 选择多个任务项
      else {
      }
    }
  }

  completeTodo(listId, taskId) {
    const _this = this;

    return function(event) {
      const uid = parseInt(window.sessionStorage.getItem('uid'));
      const token = window.sessionStorage.getItem('token');
      const taskList = _this.state.taskList.data;
      const selectedTodo = {};
      const selectedTodos = [];

      taskList.forEach((listItem, listIndex) => {
        if (listId === listItem.id) {
	  listItem.dataList.forEach((taskItem, taskIndex) => {
	    if (taskId === taskItem.id) {
	      selectedTodo.listId = listId;
	      selectedTodo.taskId = taskId;
	      selectedTodos.push(selectedTodo);
	    }
	  });
	}
      });

      _this.context.store.dispatch(
	toggleTodoCheckedActions.complete(uid, selectedTodos, token)
      );

      _this.setState({selectedTodos});
    }
  }

  uncompleteTodo(listId, taskId) {
    const _this = this;

    return function(event) {
      const uid = parseInt(window.sessionStorage.getItem('uid'));
      const token = window.sessionStorage.getItem('token');
      const taskList = _this.state.taskList.data;
      const selectedTodo = {};
      const selectedTodos = [];

      taskList.forEach((listItem, listIndex) => {
        if (listId === listItem.id) {
	  listItem.dataList.forEach((taskItem, taskIndex) => {
	    if (taskId === taskItem.id) {
	      selectedTodo.listId = listId;
	      selectedTodo.taskId = taskId;
	      selectedTodos.push(selectedTodo);
	    }
	  });
	}
      });

      _this.context.store.dispatch(
        toggleTodoCheckedActions.uncomplete(uid, selectedTodos, token)
      );

      _this.setState({selectedTodos});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.hasOwnProperty('taskList')) return true;
    else return false;
  }

  componentWillUpdate() {
    const {  uncompletedTodoClicked, completedTodoClicked } = this.state;
    if (!uncompletedTodoClicked && !completedTodoClicked && this.state.isCompletedShow) {
      this.setState({
        isCompletedShow: false
      });
    }
  }

  componentDidUpdate() {
    if (this.state.addTodo.status === 0) {
      const {  addedTodoVal, taskList } = this.state;
      let listIndex = 0;
      let taskId = this.state.addTodo.taskId;
      let text = addedTodoVal;

      taskList.data.forEach((item, index) => {
        if (item.checked) {
	  listIndex = index;
	  return;
	}
      });

      this.context.store.dispatch(addTodoActions.reset());
      this.context.store.dispatch(addTodo(listIndex, taskId, text));

      return;
    } 

    if (this.state.toggleTodoChecked.status === 0) {
      const { selectedTodos, toggleTodoChecked } = this.state;

      this.context.store.dispatch(toggleTodoCheckedActions.reset());

      // 由于标记 todo 为【完成】和【未完成】是通过一个 ajax 请求实现，所以这里
      // 要区分一下两者的状态
      switch(toggleTodoChecked.toggleType) {
	case 'complete':  // 标记为已完成
	  this.context.store.dispatch(completeTodo(selectedTodos));
	  break;
	case 'uncomplete':  // 标记为未完成
	  this.context.store.dispatch(uncompleteTodo(selectedTodos));
	  break;
	default:
	  break;
      }

      this.setState({
        selectedTodos: []
      });

      return;
    }

    if (this.state.deleteTodo.status === 0) {
      const dataList = this.state.taskList.data;
      let selectedTodo = {};
      let selectedTodos = [];
      
      dataList.forEach((listItem, listIndex) => {
        listItem.dataList.forEach((taskItem, taskIndex) => {
	  if (taskItem.selected) {
	    selectedTodo = {
	      listId: listItem.id,
	      taskId: taskItem.id
	    };
	    selectedTodos.push(selectedTodo);
	  }
	});
      });

      this.context.store.dispatch(deleteTodoActions.reset());
      this.context.store.dispatch(deleteTodo(selectedTodos));

      return;
    }
  }

  componentDidMount() {
    document.addEventListener('contextmenu', this.handleContextMenu);
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleContextMenu);
    this.state.unsubscribe(this.onChange);
  }

  render() {
    const { taskList, addTodo, toggleTasklistVisible } = this.state;

    if (addTodo.status === 0) {
      this.clearAddTodoVal();
    }

    if (typeof taskList === 'undefined') return false;
    else {
      return (
	<div className="tasks-scroll custom-scroll">
	  <div className="add-task">
	    <button className="add-task-button">
	      <img src={addSvg} alt="添加任务" />
	    </button>
	    <input 
	      className="add-task-input" 
	      type="text" 
	      placeholder="添加任务..." 
	      onFocus={addTodo.status === 'loading' ? this.handleOnFocus : null} 
	    />
	    <div className="add-task-meta">
	      <i className="meta-cal hidden">
		<img src={calendarSvg} alt="设置日期" />
	      </i>
	      <i className="meta-star hidden">
		<img className="" src={starBorderSvg} alt="星标" />
		<img className="hidden" src={starWhiteSvg} alt="星标" />
	      </i>
	    </div>
	  </div>
	  <div className="task-list ">
	    <ol className="uncompleted">
	      {
		typeof taskList !== 'undefined' && typeof taskList.data !== 'undefined' ? (
		  taskList.data.map((item, index) => {
		    let result;

		    if (item.checked) {
		      result = item.dataList.map((taskItem, taskIndex) => {
			return (
			  <li 
			    key={taskIndex}
			    className={(taskItem.completed || taskItem.deleted) ? 'collapse' : ''}
			    onMouseUp={this.onShowTaskBox(item.id, taskItem.id)}
			  >
			    <div className={taskItem.selected ? 'task-list-item selected' : 'task-list-item'}>
			      <i className="task-list-item-checkbox">
				<img 
				  src={checkboxNonSvg} 
				  alt="标记为已完成" 
				  title="标记为已完成"
				  /* onClick={this.toggleChecked(item.id, taskItem.id, 'uncompleted')} */
				  onClick={this.completeTodo(item.id, taskItem.id)}
				/>
			      </i>
			      <div className="task-list-item-input" onClick={this.handleSelectTodo(item.id, taskItem.id)}>
				<span>{taskItem.text}</span>
			      </div>
			    </div>
			  </li>
			);
		      });
		    }

		    return result;
		  })
		) : (
		  'loading...'
		)
	      }
	    </ol>
	    <h2 className="show-completed">
	      <span onClick={this.onShowCompleted}>
	        {toggleTasklistVisible.isTasklistVisible ? '隐藏' : '显示'}已完成任务
	      </span>
	    </h2>
	    <ol className={toggleTasklistVisible.isTasklistVisible ? 'completed' : 'completed hidden'}>
	      {
	        typeof taskList !== 'undefined' && typeof taskList.data !== 'undefined' ? (
		  taskList.data.map((item, index) => {
		    let result;

		    if (item.checked) {
		      result = item.dataList.map((taskItem, taskIndex) => {
			return (
			  <li 
			    key={taskIndex}
			    className={taskItem.completed && !taskItem.deleted ? '' : 'collapse'}>
			    <div className="task-list-item">
			      <i className="task-list-item-checkbox">
				<img 
				  src={checkboxCheckedSvg} 
				  alt="标记为已完成" 
				  title="标记为已完成"
				  onClick={this.uncompleteTodo(item.id, taskItem.id)}
				/>
			      </i>
			      <div className="task-list-item-input">
				<span>{taskItem.text}</span>
			      </div>
			    </div>
			  </li>
			);
		      });
		    }

		    return result;
		  })
		) : (
		  'loading...'
		)
	      }
	    </ol>
	  </div>
	  <div className="task-loading hidden">正在加载</div>
	  <div className="task-no-data hidden">暂无数据</div>
	  <div className="task-error hidden">通信失败</div>
	</div>
      );
    }
  }
}

Tasks.contextTypes = {
  store: PropTypes.object
};

export default Tasks;
