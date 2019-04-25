import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {actions as toggleModalVisibleActions } from '../../../../modal/';

import './style.css';

class CreateToolbar extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showModal = this.showModal.bind(this);

    this.state = Object.assign({}, {
      // default params
    }, this.getOwnState());
  }

  getOwnState() {
    return {
      createList: this.context.store.getState().createList
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  showModal() {
    const store = this.context.store;
    store.dispatch(toggleModalVisibleActions.visible({
      type: 'createList'
    }));
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
    return (
      <div className="create-toolbar">
	<div className="create-toolbar-inner" onClick={this.showModal}>
	  <i className="create-toolbar-icon"></i>
	  <span className="create-toolbar-title">Create list</span>
	</div>
      </div>
    );
  }
}

CreateToolbar.contextTypes = {
  store: PropTypes.object
};

export default CreateToolbar;
