import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addTodo, toggleTodoChecked } from '../actions';
import { actions as addTodoActions } from '../../components/addTodo/';
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
      toggleTodoChecked: store.getState().toggleTodoChecked,
      toggleTasklistVisible: store.getState().toggleTasklistVisible
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

      if (target.value.trim() === '') return;

      // 与服务器通信，添加一条 todo
      this.context.store.dispatch(
        addTodoActions.addTodo(uid, target.value.trim(), token)
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

  toggleChecked(listIndex, taskId, clickedType) {
    const _this = this;
    return function(event) {
      const token = window.sessionStorage.getItem('token');
      const uid = parseInt(window.sessionStorage.getItem('uid'), 10);

      _this.context.store.dispatch(
        toggleTodoCheckedActions.toggleTodoChecked(listIndex, taskId, uid, token)
      );

      _this.setState({
	listIndex, taskId
      });
    }
  }

  onShowTaskBox(event) {
    const store = this.context.store;

    // 按下鼠标右键
    if (event.button === 2) {
      const { pageX, pageY } = event;

      this.setState({
        isContextMenuVisible: false
      });

      // @TODO: Task #19 研发任务功能弹框 / 编写任务弹框模块
      // ...

      store.dispatch(taskToolBoxActions.visible({
	top: `${pageY}px`,
	left: `${pageX}px`
      }));

      store.dispatch(userboxActions.hide());
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
      const { listIndex, taskId } = this.state;

      this.context.store.dispatch(toggleTodoCheckedActions.reset());
      this.context.store.dispatch(toggleTodoChecked(listIndex, taskId));

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
			    className={taskItem.completed ? 'collapse' : ''}
			    onMouseUp={this.onShowTaskBox}>
			    <div className="task-list-item">
			      <i className="task-list-item-checkbox">
				<img 
				  src={checkboxNonSvg} 
				  alt="标记为已完成" 
				  title="标记为已完成"
				  onClick={this.toggleChecked(index, taskItem.id, 'uncompleted')}
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
			    className={taskItem.completed ? '' : 'collapse'}>
			    <div className="task-list-item">
			      <i className="task-list-item-checkbox">
				<img 
				  src={checkboxCheckedSvg} 
				  alt="标记为已完成" 
				  title="标记为已完成"
				  onClick={this.toggleChecked(index, taskItem.id, 'completed')}
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
