import React from 'react'
import { connect } from 'react-redux'
import {
  TOGGLE_MOREBOX_VISIBLE,
} from '../../actionTypes'

import sortSvg from './images/sort.svg';
import moreSvg from './images/more.svg';
import copySvg from './images/copy.svg';
import emailSvg from './images/email.svg';
import printSvg from './images/print.svg';
import undisturbSvg from './images/undisturb.svg';
import deleteSvg from './images/delete.svg';

@connect(state => ({ moreBox: state.moreBox }))
class Toolbar extends React.Component {
  state = {
    moreBoxParams: [
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
  }

  onClickMore = () => {
    const { dispatch, moreBox } = this.props
    dispatch({
      type: TOGGLE_MOREBOX_VISIBLE,
      isMoreboxExtended: !moreBox.isMoreboxExtended,
    })
  }

  // @TODO list item of moreBox onClicked
  onClickMoreboxListItem = type => {
    return function() {
      console.log(type)
    }
  }

  render() {
    const { moreBox } = this.props

    return (
      <div className="list-toolbar">
        <h1>Title...</h1>
        <div className="action-bar">
          <div className="action-bar-buttons">
            <button className="sort" onClick={this.onClickSort}>
              <img src={sortSvg} alt="排序" title="排序" />
            </button>
            <button className="more" onClick={this.onClickMore}>
              <img src={moreSvg} alt="更多" title="更多" />
            </button>
          </div>
          <div className="action-bar-content active">
            <ul className={moreBox.isMoreboxExtended ? 'more active' : 'more'}>
              {
                this.state.moreBoxParams.map((listItem, listIndex) => {
                  return (
                    <li
                      // className="disable"
                      onClick={this.onClickMoreboxListItem(listItem.type)}
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
      </div>
    )
  }
}

export default Toolbar
