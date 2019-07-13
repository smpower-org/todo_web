import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
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

  onClickMoreButton = () => {
    const { dispatch, moreBox } = this.props
    dispatch({
      type: TOGGLE_MOREBOX_VISIBLE,
      isMoreboxExtended: !moreBox.isMoreboxExtended,
    })
  }

  // TODO: 复制清单
  onCopyList = () => {
    message.info('研发中...')
  }

  // TODO: 以电子邮件发送清单
  onEmailList = () => {
    message.info('研发中...')
  }

  // TODO: 以电子邮件发送所选任务
  onEmailCheckedTask = () => {
    message.info('研发中...')
  }

  // TODO: 打印清单
  onPrintList = () => {
    message.info('研发中...')
  }

  // TODO: 打印所选任务
  onPrintCheckedTask = () => {
    message.info('研发中...')
  }

  // TODO: 勿扰
  onUndisturb = () => {
    message.info('研发中...')
  }

  // TODO: 删除所选任务
  onDeleteCheckedTask = () => {
    message.info('研发中...')
  }

  // 点击 moreBox 中的条目
  onClickMoreboxListItem = type => {
    const _this = this
    return function() {
      switch (type) {
        case 'copy':
          _this.onCopyList()
          break
        case 'emailList':
          _this.onEmailList()
          break
        case 'emailTask':
          _this.onEmailCheckedTask()
          break
        case 'printList':
          _this.onPrintList()
          break
        case 'printTask':
          _this.onPrintCheckedTask()
          break
        case 'undistrub':
          _this.onUndisturb()
          break
        case 'delete':
          _this.onDeleteCheckedTask()
          break
        default:
          break
      }
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
            <button className="more" onClick={this.onClickMoreButton}>
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
