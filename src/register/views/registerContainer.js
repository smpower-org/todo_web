import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Register from './register';
import {regist} from '../actions';
import {Validator} from '../../components/formCheck/';

import './style.css';

class RegisterContainer extends Component {
  constructor() {
    super(...arguments);

    this.onChange = this.onChange.bind(this);
    this.setErrorMsg = this.setErrorMsg.bind(this);
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nameInputValue: '',
      emailInputValue: '',
      passwordInputValue: '',
      nameInputErrorMsg: '',
      emailInputErrorMsg: '',
      passwordInputErrorMsg: '',
      errorMsg: null
    };
  }

  onChange() {
    const {status, isRegisted} = this.context.store.getState().register;

    if (status === 'success' && isRegisted) this.props.history.push('/login');
  }

  setErrorMsg(key, errorMsg) {  // 设置错误信息
    if (errorMsg) {
      this.setState({
        [key]: errorMsg
      });
      return;
    } else {
      this.setState({
        [key]: ''
      });
      return;
    }
  }

  onNameInputChange(event) {
    this.setState({
      nameInputValue: event.target.value.trim()
    });

    const validator = new Validator();
    validator.add(event.target.value.trim(), [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入用户名'
    }, {
      strategy: 'minLength: 2',
      errorMsg: '用户名应大于 2 位'
    }, {
      strategy: 'maxLength: 20',
      errorMsg: '用户名应小于 20 位'
    }]);

    const errorMsg = validator.start();
    this.setErrorMsg('nameInputErrorMsg', errorMsg);
    return;
  }

  onEmailInputChange(event) {
    this.setState({
      emailInputValue: event.target.value.trim()
    });

    const validator = new Validator();
    validator.add(event.target.value.trim(), [{
      strategy: 'isNonEmpty',
      errorMsg:  '请输入邮箱'
    }, {
      strategy: 'isEmail',
      errorMsg: '请输入正确的邮箱'
    }]);

    const errorMsg = validator.start();
    this.setErrorMsg('emailInputErrorMsg', errorMsg);
    return;
  }

  onPasswordInputChange(event) {
    this.setState({
      passwordInputValue: event.target.value.trim()
    });

    const validator = new Validator();
    validator.add(event.target.value.trim(), [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入密码'
    }, {
      strategy: 'minLength: 8',
      errorMsg: '密码长度应不小于 8 位'
    }, {
      strategy: 'maxLength: 16',
      errorMsg: '密码长度应不大于 16 位'
    }]);

    const errorMsg = validator.start();
    this.setErrorMsg('passwordInputErrorMsg', errorMsg);
    return;
  }

  onSubmit() {
    const {
      nameInputErrorMsg, emailInputErrorMsg, passwordInputErrorMsg
    } = this.state;
    const isNameInputPassed = nameInputErrorMsg === '' ? true : false;
    const isEmailInputPassed = emailInputErrorMsg === '' ? true : false;
    const isPasswordInputPassed = passwordInputErrorMsg === '' ? true : false;

    if (isNameInputPassed && isEmailInputPassed && isPasswordInputPassed) {
      this.context.store.dispatch(regist(
        this.state.nameInputValue,
	this.state.emailInputValue,
	this.state.passwordInputValue
      ));
      return;
    }
  }

  componentWillMount() {
    if (sessionStorage.isUserLogined) {
      this.props.history.push('/');
      return;
    }
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
	nameInputErrorMsg={this.state.nameInputErrorMsg}
	emailInputErrorMsg={this.state.emailInputErrorMsg}
	passwordInputErrorMsg={this.state.passwordInputErrorMsg}
	onSubmit={this.onSubmit}
      />
    );
  }

  componentDidMount() {
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }
}

RegisterContainer.contextTypes = {
  store: PropTypes.object
};

export default RegisterContainer;
