import React from 'react'

class CreateToolbar extends React.Component {
  render() {
    return (
      <div className="create-toolbar">
        <div className="create-toolbar-inner" onClick={this.showModal}>
          <i className="create-toolbar-icon"></i>
          <span className="create-toolbar-title">创建清单</span>
        </div>
      </div>
    )
  }
}

export default CreateToolbar
