import React from 'react'
import { connect } from 'react-redux'
import { TOGGLE_SIDER } from '../../actionTypes'

@connect(state => ({ sider: state.sider }))
class SearchToolbar extends React.Component {
  onClickMenuBtn = () => {
    const { dispatch, sider } = this.props
    dispatch({ type: TOGGLE_SIDER, isSiderExtended: !sider.isSiderExtended })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState)
    return true
  }

  render() {
    return (
      <div className="search-toolbar">
        <div className="search-menu-wrapper">
					<i className="search-menu-icon" onClick={this.onClickMenuBtn}></i>
				</div>
				<div className="search-input-wrapper">
					<input className="search-input" type="text" />
				</div>
				<div className="search-icon-wrapper">
					<i className="search-icon"></i>
				</div>
      </div>
    )
  }
}

export default SearchToolbar
