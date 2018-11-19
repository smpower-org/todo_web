import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Login from './login';
import {login} from '../actions';
import {actions} from '../../register/';

import './style.css';

class LoginContainer extends Component {
  constructor() {
    super(...arguments);

    this.onChange = this.onChange.bind(this);
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

  onChange() {
    const {status, isLogined,} = this.context.store.getState().login;
    console.log(status);
    console.log(isLogined);
    if (status === 'success' && isLogined) {  // 登录成功
      const {username, cryemail, crypwd} = this.context.store.getState().login;
      sessionStorage.setItem('isUserLogined', true);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('cryemail', cryemail);
      sessionStorage.setItem('crypwd', crypwd);

      this.props.history.replace('/');
      return;
    }

    if (status === 'success' && !isLogined) {  // 登录失败
      alert('用户名或密码错误');
      console.log('用户名或密码错误');
      return;
    }
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
    this.context.store.dispatch(login(emailInputValue, passwordInputValue));
  }

  componentWillMount() {
    if (sessionStorage.isUserLogined) {
      this.props.history.push('/');
    }
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

  componentDidMount() {
    this.context.store.dispatch(actions.clearStore());
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }
}

LoginContainer.contextTypes = {
  store: PropTypes.object
};

export default LoginContainer;
