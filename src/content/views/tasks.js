import React, { Component } from 'react';
import PropTypes from 'prop-types';

import addSvg from './images/add.svg';
import calendarSvg from './images/calendar.svg';
import starBorderSvg from './images/star-border.svg';
import starWhiteSvg from './images/star-white.svg';
import checkboxNonSvg from './images/checkbox-non.svg';
// import checkboxCheckedSvg from './images/checkbox-checked.svg';

class Tasks extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.onShowCompleted = this.onShowCompleted.bind(this);

    this.state = Object.assign({}, {
      // default params...
    }, this.getOwnState());
  }

  getOwnState() {
    return {
      taskList: this.context.store.getState().taskList
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  handleOnFocus() {
    document.addEventListener('keydown', this.handleEnterKey, false);
  }

  handleEnterKey(event) {
    const target = event.target;
    if (event.keyCode === 13) {
      if (target.value.trim() === '') {
	alert('不能为空！');
	return;
      }
      console.log('与服务器通信，添加一条 todo。');
    }
  }

  onShowCompleted() {
    alert('研发中...');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.hasOwnProperty('taskList')) return true;
    else return false;
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
    const taskList = this.state.taskList;

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
	      onFocus={this.handleOnFocus} 
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
	    <ol>
	      {
		typeof taskList !== 'undefined' && typeof taskList.data !== 'undefined' ? (
		  taskList.data.map((item, index) => {
		    let result;

		    if (item.checked) {
		      result = item.dataList.map((taskItem, taskIndex) => {
			return (
			  <li key={taskIndex}>
			    <div className="task-list-item">
			      <i className="task-list-item-checkbox">
				<img 
				  src={checkboxNonSvg} 
				  alt="标记为已完成" 
				  title="标记为已完成"
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
	      <span onClick={this.onShowCompleted}>显示已完成任务</span>
	    </h2>
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
