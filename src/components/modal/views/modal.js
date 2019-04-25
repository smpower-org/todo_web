import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hide as modalHide } from '../actions';
import { actions as createListActions } from '../../createList/';
import { actions as contentActions } from '../../../content/';

import './style.scss';

class Modal extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.modalContent = this.modalContent.bind(this);

    this.state = Object.assign({}, {
      // default params
    }, this.getOwnState());
  }

  getOwnState() {
    return {
      toggleModalVisible: this.context.store.getState().toggleModalVisible
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  modalContent() {
    const { isModalVisible } = this.state.toggleModalVisible;

    switch(this.state.toggleModalVisible.params.type) {
      case 'createList':
	return <CreateListContent isModalVisible={isModalVisible} />;
      default:
	break;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isStateModalVisible = this.state.toggleModalVisible.isModalVisible;
    const isNextStateModalVisible = nextState.toggleModalVisible.isModalVisible;

    if (isStateModalVisible !== isNextStateModalVisible) return true;
    else return false;
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
    const { isModalVisible } = this.state.toggleModalVisible;

    return (
      <div className={isModalVisible ? 'modal active' : 'modal'}>
	<div className={isModalVisible ? 'modal-inner active' : 'modal-inner'}>
	  <div className={isModalVisible ? 'modal-wrap' : 'modal-wrap hidden'}>
	    {this.modalContent()}
	  </div>
	</div>
      </div>
    );
  }
}

Modal.contextTypes = {
  store: PropTypes.object
};
Modal.propTypes = {
  type: PropTypes.string
};

class CreateListContent extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyupChange = this.handleKeyupChange.bind(this);
    this.handleCancle = this.handleCancle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = Object.assign({}, {
      // default params
      uid: parseInt(window.sessionStorage.getItem('uid')),
      token: window.sessionStorage.getItem('token'),
      inputValue: ''
    }, this.getOwnState());
  }

  getOwnState() {
    const store = this.context.store;

    return {
      createList: store.getState().createList
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  handleKeyupChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleCancle() {
    this.context.store.dispatch(modalHide({type: 'createList'}));
    this.setState({inputValue: ''});
  }

  handleSubmit(event) {
    const { uid, inputValue, token } = this.state;

    if (inputValue.trim() === '') return;

    this.context.store.dispatch(
      createListActions.createList(uid, inputValue, token)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.createList.status !== nextState.createList.status ||
      this.state.inputValue !== nextState.inputValue ||
      nextProps.isModalVisible
    ) return true;
    else return false;
  }

  componentDidUpdate() {
    if (this.state.createList.status === 0) {
      const { createList } = this.state;

      this.context.store.dispatch(createListActions.reset());
      this.context.store.dispatch(modalHide({type: 'createList'}));
      this.context.store.dispatch(contentActions.createList(createList.data));
      this.setState({inputValue: ''});
    }
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
    const { inputValue } = this.state;

    return (
      <div className="modal-content">
	<div className="modal-title text-center">
	  <h3>创建新清单</h3>
	</div>
	<div className="modal-body">
	  <div className="modal-input">
	    <input 
	      type="text" 
	      placeholder="清单名称"
	      value={inputValue} 
	      onChange={this.handleKeyupChange}
	    />
	  </div>
	</div>
	<div className="modal-footer">
	  <div className="modal-buttons">
	    <button
	      className="modal-cancle"
	      type="button"
	      onClick={this.handleCancle}
	    >取消</button>
	    <button 
	      className={inputValue.trim() === '' ? 'modal-confirm disable' : 'modal-confirm' }
	      onClick={this.handleSubmit}
	      type="button"
	    >创建</button>
	  </div>
	</div>
      </div>
    );
  }
}

CreateListContent.contextTypes = {
  store: PropTypes.object
};
CreateListContent.propTypes = {
  isModalVisible: PropTypes.bool
};

export default Modal;

