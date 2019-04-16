import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sortSvg from './images/sort.svg';
import moreSvg from './images/more.svg';
import copySvg from './images/copy.svg';
import emailSvg from './images/email.svg';
import printSvg from './images/print.svg';
import undisturbSvg from './images/undisturb.svg';
import deleteSvg from './images/delete.svg';

class Toolbar extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickMore = this.onClickMore.bind(this);

    this.state = Object.assign({}, {
      // default params
      isMoreContentExtracted: false,
    }, this.getOwnState());
  }

  getOwnState() {
    return {
      taskList: this.context.store.getState().taskList.data
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  onClickSort() {
    console.log('on sort...');
  }

  onClickMore() {
    this.setState({
      isMoreContentExtracted: !this.state.isMoreContentExtracted,
    });
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
    const { isMoreContentExtracted, taskList } = this.state;

    return(
      <div className="list-toolbar">
        {
	  typeof taskList !== 'undefined' ? (
	    taskList.map((item, index) => {
	      if (item.checked) {
		return <h1 key={index}>{item.box}</h1>;
	      } else return false;
	    })
	  ) : (
	    <h1>Loading...</h1>
	  )
	}
	<div className="action-bar">
	  <div className="action-bar-buttons">
	    <button className="sort hidden" onClick={this.onClickSort}>
	      <img src={sortSvg} alt="排序" />
	      <span>排序</span>
	    </button>
	    <button className="more" onClick={this.onClickMore}>
	      <img src={moreSvg} alt="更多" />
	      <span>更多</span>
	    </button>
	  </div>
	  <div className="action-bar-content">
	    <ul className={isMoreContentExtracted ? 'more active' : 'more'}>
	      <li>
		<img src={copySvg} alt="复制" />
		<span>复制清单</span>
	      </li>
	      <li>
	        <img src={emailSvg} alt="以电子邮件发送清单" />
		<span>以电子邮件发送清单</span>
	      </li>
	      <li>
	        <img src={emailSvg} alt="用电子邮件发送所选任务" />
		<span>用电子邮件发送所选任务</span>
	      </li>
	      <li>
	        <img src={printSvg} alt="打印清单" />
		<span>打印清单</span>
	      </li>
	      <li>
	        <img src={printSvg} alt="打印所选任务" />
		<span>打印所选任务</span>
	      </li>
	      <li>
	        <img src={undisturbSvg} alt="勿扰" />
		<span>勿扰</span>
	      </li>
	      <li>
	        <img src={deleteSvg} alt="删除" />
		<span>删除所选任务</span>
	      </li>
	    </ul>
	  </div>
	</div>
      </div>
    );
  }
}

Toolbar.contextTypes = {
  store: PropTypes.object
};

export default Toolbar;
