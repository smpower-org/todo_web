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

    const validator = new Validator();
    validator.add(event.target.value.trim(), [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入用户名'
    }, {
      strategy: 'minLength: 4',
      errorMsg: '用户名应大于 4 位'
    }, {
      strategy: 'maxLength: 20',
      errorMsg: '用户名应小于 20 位'
    }]);

    const errorMsg = validator.start();
    if (errorMsg) console.log(errorMsg);
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
    if (errorMsg) console.log(errorMsg);
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
    if (errorMsg) console.log(errorMsg);
  }

  onSubmit() {
    this.context.store.dispatch(regist(
      this.state.nameInputValue,
      this.state.emailInputValue,
      this.state.passwordInputValue
    ));
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
