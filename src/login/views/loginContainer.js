import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './login';
import { login } from '../actions';
import { actions } from '../../register/';
import { actions as authActions } from '../../components/auth/';

import './style.css';

class LoginContainer extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEmailInputFocus = this.onEmailInputFocus.bind(this);
    this.onEmailInputBlur = this.onEmailInputBlur.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordInputFocus = this.onPasswordInputFocus.bind(this);
    this.onPasswordInputBlur = this.onPasswordInputBlur.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onSignin = this.onSignin.bind(this);

    this.state = Object.assign({}, {
      // default params
      emailInputFocused: false,
      passwordInputFocused: false,
      emailInputValue: '',
      passwordInputValue: '',
      ...this.props
    }, this.getOwnState());
  }

  getOwnState() {
    return {
      login: this.context.store.getState().login,
      auth: this.context.store.getState().auth
    };
  }

  onChange() {
    this.setState(this.getOwnState());

    const { status, uid, token } = this.state.login;

    // 登录成功
    if (status === 0) {
      const { history } = this.state;
      sessionStorage.setItem('logged_in', true);
      sessionStorage.setItem('uid', uid);
      sessionStorage.setItem('token', token);
      history.replace('/home');
      return;
    }

    sessionStorage.setItem('logged_in', false);
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
    this.context.store.dispatch(authActions.setAuthenticate(true));
  }

  componentWillMount() {
    // if (sessionStorage.isUserLogined) {
    //   this.props.history.push('/');
    // }
  }

  componentDidMount() {
    this.context.store.dispatch(actions.clearStore());
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe(this.onChange);
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

LoginContainer.contextTypes = {
  store: PropTypes.object
};

export default LoginContainer;
