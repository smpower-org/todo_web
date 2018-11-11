import React, {Component} from 'react';
import Login from './login';

import './style.css';

class LoginContainer extends Component {
  constructor() {
    super(...arguments);

    this.onEmailInputFocus = this.onEmailInputFocus.bind(this);
    this.onEmailInputBlur = this.onEmailInputBlur.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordInputFocus = this.onPasswordInputFocus.bind(this);
    this.onPasswordInputBlur = this.onPasswordInputBlur.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onSignin = this.onSignin.bind(this);

    this.state = {
      emailInputFocused: false,
      passwordInputFocused: false,
      emailInputValue: '',
      passwordInputValue: ''
    };
  }

  onEmailInputFocus() {
    this.setState({
      emailInputFocused: true
    });
  }

  onEmailInputBlur() {
    if (this.state.emailInputValue.trim() !== '') return;
    this.setState({
      emailInputFocused: false
    });
  }

  onEmailInputChange(event) {
    this.setState({
      emailInputValue: event.target.value
    });
  }

  onPasswordInputFocus() {
    this.setState({
      passwordInputFocused: true
    });
  }

  onPasswordInputBlur() {
    if (this.state.passwordInputValue.trim() !== '') return;
    this.setState({
      passwordInputFocused: false
    });
  }

  onPasswordInputChange(event) {
    this.setState({
      passwordInputValue: event.target.value
    });
  }

  onSignin() {
    const {
      emailInputValue,
      passwordInputValue
    } = this.state;

    if (emailInputValue === '' || passwordInputValue === '') {
      alert('请完善登录信息');
      console.log('请完善登录信息');
      return;
    }

    // 派发 action...
  }

  render() {
    return (
      <Login 
	onEmailInputFocus={this.onEmailInputFocus}
	onEmailInputBlur={this.onEmailInputBlur}
	onEmailInputChange={this.onEmailInputChange}
	emailInputValue={this.state.emailInputValue}
	emailPlaceholderClass={this.state.emailInputFocused ? 'active' : ''}
	onPasswordInputFocus={this.onPasswordInputFocus}
	onPasswordInputBlur={this.onPasswordInputBlur}
	onPasswordInputChange={this.onPasswordInputChange}
	passwordInputValue={this.state.passwordInputValue}
	passwordPlaceholderClass={this.state.passwordInputFocused ? 'active' : ''}
	onSignin={this.onSignin}
      />
    );
  }
}

export default LoginContainer;
