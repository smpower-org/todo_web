import React, { Component } from 'react';

import addSvg from './images/add.svg';
import calendarSvg from './images/calendar.svg';
import starBorderSvg from './images/star-border.svg';
import starWhiteSvg from './images/star-white.svg';

class Tasks extends Component {
  render() {
    return (
      <div className="tasks-scroll">
	<div className="add-task">
	  <button className="add-task-button">
	    <img src={addSvg} alt="添加任务" />
	  </button>
	  <input className="add-task-input" type="text" placeholder="添加任务..." />
	  <div className="add-task-meta">
	    <i class="meta-cal hidden">
	      <img src={calendarSvg} alt="设置日期" />
	    </i>
	    <i className="meta-star hidden">
	      <img className="" src={starBorderSvg} alt="星标" />
	      <img className="hidden" src={starWhiteSvg} alt="星标" />
	    </i>
	  </div>
	</div>
	<div className="task-list"></div>
	<div className="task-loading hidden">正在加载</div>
	<div className="task-no-data hidden">暂无数据</div>
	<div className="task-error hidden">通信失败</div>
      </div>
    );
  }
}

export default Tasks;
