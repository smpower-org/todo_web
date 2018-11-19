import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Register from './register';
import {regist} from '../actions';
import {actions, status} from '../../checkUsername/';
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

  onChange() {
    const {status, isRegisted} = this.context.store.getState().register;
    if (status === 'success' && isRegisted) this.props.history.replace('/login');
  }

  setErrorMsg(key, errorMsg) {  // 设置错误信息
    if (errorMsg) {
      this.setState({
        [key]: errorMsg
      });
    } else {
      this.setState({
        [key]: ''
      });
    }
    return;
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
    }, {
      strategy: 'isUsernameExisted',  // 判断用户是否已注册
      errorMsg: (value) => {
	this.context.store.dispatch(actions.checkUsername(value));

	const getStatus = () => {
	  const checkUsername = this.context.store.getState().checkUsername;
	  if (checkUsername.status === status.SUCCESS) {
	    window.clearInterval(timer);
	    if (checkUsername.isUsernameExisted) {
	      this.setErrorMsg('nameInputErrorMsg', '该用户已被注册');
	    } else this.setErrorMsg('nameInputErrorMsg', '');
	  }
	};

	const timer = window.setInterval(getStatus, 1000);
      }
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
      nameInputValue, emailInputValue, passwordInputValue,
      nameInputErrorMsg, emailInputErrorMsg, passwordInputErrorMsg
    } = this.state;

    const isNameInputPassed = (nameInputErrorMsg === '' && nameInputValue !== '') ? true : false;
    const isEmailInputPassed = (emailInputErrorMsg === '' && emailInputValue !== '') ? true : false;
    const isPasswordInputPassed = (passwordInputErrorMsg === '' && passwordInputValue !== '') ? true : false;

    if (isNameInputPassed && isEmailInputPassed && isPasswordInputPassed) {
      this.context.store.dispatch(regist(
        this.state.nameInputValue,
	this.state.emailInputValue,
	this.state.passwordInputValue
      ));
      return;
    } else {
      alert('请检查注册信息');
    }
  }

  componentWillMount() {
    if (sessionStorage.isUserLogined) {
      this.props.history.replace('/');
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
