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
	<More 
	  isMoreContentExtracted={isMoreContentExtracted}
	/>
      </div>
    );
  }
}

Toolbar.contextTypes = {
  store: PropTypes.object
};

class More extends Component {
  constructor() {
    super(...arguments);

    this.onClickMore = this.onClickMore.bind(this);
    this.onClickSort = this.onClickSort.bind(this);

    this.state = Object.assign({}, {
      // default params
      listParams: [
	{
	  text: '复制清单',
	  imgSrc: copySvg,
	  type: 'copy'
	},
	{
	  text: '以电子邮件发送清单',
	  imgSrc: emailSvg,
	  type: 'emailList'
	},
	{
	  text: '用电子邮件发送所选任务',
	  imgSrc: emailSvg,
	  type: 'emailTask'
	},
	{
	  text: '打印清单',
	  imgSrc: printSvg,
	  type: 'printList'
	},
	{
	  text: '打印所选任务',
	  imgSrc: printSvg,
	  type: 'printTask'
	},
	{
	  text: '勿扰',
	  imgSrc: undisturbSvg,
	  type: 'undisturb'
	},
	{
	  text: '删除所选任务',
	  imgSrc: deleteSvg,
	  type: 'delete'
	},
      ]
    }, this.props);
  }

  /**
   * @des 点击更多按钮
   *      展开或收起【更多】弹框
  **/
  onClickMore() {
    this.setState({
      isMoreContentExtracted: !this.state.isMoreContentExtracted,
    });
  }

  /**
   * @des 排序
  **/
  onClickSort() {
    alert('研发中...');
  }

  /**
   * @des 点击【更多】弹框中的选项
   * @params type {String} - 根据 type 判断点击的是哪个选项
  **/
  onClickListItem(type) {
    const _this = this;

    return function(event) {
      // 收起【更多】弹框
      const extractMoreContent = () => {
	_this.setState({
	  isMoreContentExtracted: false
	});
      };

      switch(type) {
	case 'copy':
	  alert('研发中');
	  extractMoreContent();
	  break;
	case 'emailList':
	  alert('研发中');
	  extractMoreContent();
	  break;
	case 'emailTask':
	  alert('研发中');
	  extractMoreContent();
          break;
	case 'printList':
	  alert('研发中');
	  extractMoreContent();
	  break;
	case 'printTask':
	  alert('研发中');
	  extractMoreContent();
	  break;
	case 'undisturb':
	  alert('研发中');
	  extractMoreContent();
	  break;
	case 'delete':
	  alert('研发中');
	  extractMoreContent();
	  break;
        default:
	  break;
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isMoreContentExtracted !== nextState.isMoreContentExtracted) return true;
    else return false;
  }

  render() {
    const { isMoreContentExtracted } = this.state;

    return (
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
	    {
	      this.state.listParams.map((listItem, listIndex) => {
		return (
		  <li
		    className="disable"
		    onClick={this.onClickListItem(listItem.type)} 
		    key={listIndex}
		  >
		    <img 
		      src={listItem.imgSrc} 
		      alt={listItem.text} 
		    />
		    <span>{listItem.text}</span>
		  </li>
		);
	      })
	    }
	  </ul>
	</div>
      </div>
    );
  }
}

More.contextTypes = {
  store: PropTypes.object
};
More.propTypes = {
  isMoreContentExtracted: PropTypes.bool
};


export default Toolbar;
