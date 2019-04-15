import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Inbox extends Component {  // 收件箱
  constructor() {
    super(...arguments);

    this.onInboxClicked = this.onInboxClicked.bind(this);

    this.state = Object.assign({}, {
      // default params
      taskList: this.context.store.getState().taskList.data,
      isInboxClicked: false
    });
  }

  onInboxClicked() {
    const { isInboxClicked } = this.state;

    if (isInboxClicked) return;

    this.setState({
      isInboxClicked: true
    });
  }

  render() {
    const { isInboxClicked } = this.state;
    const taskClassName = 'lists-toolbar-filter-item';

    return (
      <ul className="lists-toolbar-filter">
	<li className={isInboxClicked ? `${taskClassName} active` : `${taskClassName}` } onClick={this.onInboxClicked}>
	  <i className="lists-toolbar-filter-icon"></i>
	  <span className="lists-toolbar-filter-title">Inbox</span>
	  <span className="lists-toolbar-filter-count">2</span>
	</li>
      </ul>
    );
  }
}

Inbox.contextTypes = {
  store: PropTypes.object
};

export default Inbox;
