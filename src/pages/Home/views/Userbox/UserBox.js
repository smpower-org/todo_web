import React from 'react'
import { message } from 'antd'
import './style.scss'

class UserBox extends React.Component {
  handleSync = () => {
    message.info('研发中...')
  }

  handleAccountSetting = () => {
    message.info('研发中...')
  }

  handleChangeBackground = () => {
    message.info('研发中...')
  }

  handleLogout = () => {
    message.info('研发中...')
  }

  render() {
    return (
      <div className="user-box">
        <div className="menu">
          <ul>
            <li className="last-sync-time">
              最后同步：
              <span>29 分钟之前</span>
            </li>
            <li className="sync" onClick={this.handleSync}>立即同步</li>
            <li className="setting" onClick={this.handleAccountSetting}>账户设置</li>
            <li className="chbg" onClick={this.handleChangeBackground}>更换背景</li>
            <li className="logout" onClick={this.handleLogout}>登出</li>
          </ul>
        </div>
      </div>
    )
  }
}

export { UserBox as View }
