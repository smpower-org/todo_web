import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Register from './register';
import {regist} from '../actions';

import './style.css';

class RegisterContainer extends Component {
  constructor() {
    super(...arguments);

    this.onChange = this.onChange.bind(this);
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nameInputValue: '',
      emailInputValue: '',
      passwordInputValue: ''
    };
  }

  onChange() {
    const {status, isRegisted} = this.context.store.getState().register;

    if (status === 'success' && isRegisted) this.props.history.push('/login');
  }

  onNameInputChange(event) {
    this.setState({
      nameInputValue: event.target.value.trim()
    });
  }

  onEmailInputChange(event) {
    this.setState({
      emailInputValue: event.target.value.trim()
    });
  }

  onPasswordInputChange(event) {
    this.setState({
      passwordInputValue: event.target.value.trim()
    });
  }

  onSubmit() {
    this.context.store.dispatch(regist(
      this.state.nameInputValue,
      this.state.emailInputValue,
      this.state.passwordInputValue
    ));
  }

  render() {
    return (
      <Register 
        onNameInputChange={this.onNameInputChange}
	onEmailInputChange={this.onEmailInputChange}
	onPasswordInputChange={this.onPasswordInputChange}
	nameInputValue={this.state.nameInputValue}
	emailInputValue={this.state.emailInputValue}
	passwordInputValue={this.state.passwordInputValue}
	onSubmit={this.onSubmit}
      />
    );
  }

  componentDidMount() {
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe()
  }
}

RegisterContainer.contextTypes = {
  store: PropTypes.object
};

export default RegisterContainer;
