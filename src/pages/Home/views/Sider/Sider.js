import React from 'react'
import { connect } from 'react-redux'
import SearchToolbar from './SearchToolbar'
import UserToolbar from './UserToolbar'
import ListsToolbar from './ListsToolbar'
import CreateToolbar from './CreateToolbar'
import './style.scss'

@connect(state => ({ sider: state.sider }))
class Sider extends React.Component {
  render() {
    const { isSiderExtended } = this.props.sider
    return (
      <div className={isSiderExtended ? 'sider active' : 'sider'}>
        <div className="inner">
          <SearchToolbar />
          <UserToolbar />
          <ListsToolbar />
          <CreateToolbar />
        </div>
      </div>
    )
  }
}

export { Sider as View }
