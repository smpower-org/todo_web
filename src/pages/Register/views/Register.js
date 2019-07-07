import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { message } from 'antd'
import { Validator } from '@src/utils/'
import { View as TipBox } from '@src/components/TipBox/'
import { REGISTER } from '../actionTypes'
import './style.scss'

@connect(state => ({ register: state.register }))
class Register extends React.Component {
  state = {
    nameInputValue: '',
    emailInputValue: '',
    passwordInputValue: '',
    nameInputErrorMsg: '',
    emailInputErrorMsg: '',
    passwordInputErrorMsg: '',
    errorMsg: null,
  }

  setErrorMsg(key, errorMsg) {  // 设置错误信息
    if (errorMsg) {
      this.setState({ [key]: errorMsg })
    } else {
      this.setState({ [key]: '' })
    }
  }

  onNameInputChange = event => {  // 用户名
    this.setState({
      nameInputValue: event.target.value.trim()
    });

    const validator = new Validator();
    validator.add(event.target.value.trim(), [
      {
        strategy: 'isNonEmpty',
        errorMsg: '请输入用户名'
      },
      {
        strategy: 'minLength: 4',
        errorMsg: '用户名应大于 4 位'
      },
      {
        strategy: 'maxLength: 20',
        errorMsg: '用户名应小于 20 位'
      },
      // {
      //   strategy: 'isUsernameExisted',  // 判断用户是否已注册
      //   errorMsg: (value) => {
      //     this.context.store.dispatch(checkUsernameActions.checkUsername(value));

      //     const getStatus = () => {
      //       const checkUsername = this.context.store.getState().checkUsername;
      //       if (checkUsername.status === checkUsernameStatus.SUCCESS) {
      //         window.clearInterval(timer);
      //         if (checkUsername.isUsernameExisted) {
      //           this.setErrorMsg('nameInputErrorMsg', '该用户已被注册');
      //         } else this.setErrorMsg('nameInputErrorMsg', '');
      //       }
      //     };

      //     const timer = window.setInterval(getStatus, 30);
      //   }
      // }
    ]);

    const errorMsg = validator.start();
    this.setErrorMsg('nameInputErrorMsg', errorMsg);
  }

  onEmailInputChange = event => {  // 邮箱
    this.setState({
      emailInputValue: event.target.value.trim()
    });

    const validator = new Validator();
    validator.add(event.target.value.trim(), [
      {
        strategy: 'isNonEmpty',
        errorMsg:  '请输入邮箱'
      },
      {
        strategy: 'isEmail',
        errorMsg: '请输入正确的邮箱'
      },
      // {
      //   strategy: 'isEmailExisted',
      //   errorMsg: (value) => {
      //     this.context.store.dispatch(checkEmailActions.checkEmail(value));

      //     const getStatus = () => {
      //       const checkEmail = this.context.store.getState().checkEmail;
      //       if (checkEmail.status === checkEmailStatus.SUCCESS) {
      //         window.clearInterval(emailTimer);
      //         if (checkEmail.isEmailExisted) {
      //           this.setErrorMsg('emailInputErrorMsg', '该邮箱已被注册');
      //         } else this.setErrorMsg('emailInputErrorMsg', '');
      //       }
      //     };

      //     const emailTimer = window.setInterval(getStatus, 30);
      //   }
      // }
    ]);

    const errorMsg = validator.start();
    this.setErrorMsg('emailInputErrorMsg', errorMsg);
  }

  onPasswordInputChange = event => {  // 密码
    this.setState({
      passwordInputValue: event.target.value.trim()
    });

    const validator = new Validator();
    validator.add(event.target.value.trim(), [{
        strategy: 'isNonEmpty',
        errorMsg: '请输入密码'
      },
      {
        strategy: 'minLength: 8',
        errorMsg: '密码长度应不小于 8 位'
      },
      {
        strategy: 'maxLength: 16',
        errorMsg: '密码长度应不大于 16 位'
      },
    ]);

    const errorMsg = validator.start();
    this.setErrorMsg('passwordInputErrorMsg', errorMsg);
  }

  onSubmit = () => {  // 注册
    const {
      nameInputValue, emailInputValue, passwordInputValue,
      nameInputErrorMsg, emailInputErrorMsg, passwordInputErrorMsg
    } = this.state;

    const isNameInputPassed = (nameInputErrorMsg === '' && nameInputValue !== '') ? true : false;
    const isEmailInputPassed = (emailInputErrorMsg === '' && emailInputValue !== '') ? true : false;
    const isPasswordInputPassed = (passwordInputErrorMsg === '' && passwordInputValue !== '') ? true : false;

    if (isNameInputPassed && isEmailInputPassed && isPasswordInputPassed) {
      this.props.dispatch({
        type: REGISTER,
        data: {
          username: this.state.nameInputValue,
          email: this.state.emailInputValue,
          password: this.state.passwordInputValue,
        },
      })
    } else message.warning('请检查注册信息')
  }

  render() {
    const { register } = this.props
    if (register.status === 'success') {
      const { message } = register.payload
      if (message && message === 'success') return <Redirect to="/" /> 
    }

    return (
      <div className="main">
        <div className="register">
          <div className="register-logo">
            <i className="register-logo-icon"></i>
            <h1 className="register-logo-title">Get Wundertodo For Free</h1>
          </div>
          <div className="register-inner">
          <div className="register-item register-name">
            <i className="register-item-icon register-name-icon"></i>
            <input
              type="text"
              className="register-item-input register-name-input"
              placeholder="请输入用户名" 
              onChange={this.onNameInputChange}
              value={this.state.nameInputValue}
            />
            <div className={this.state.nameInputErrorMsg === '' ? "register-item-tip register-name-tip" : "register-item-tip register-name-tip active"}>
              <TipBox value={this.state.nameInputErrorMsg} />
            </div>
          </div>
          <div className="register-item register-email">
            <i className="register-item-icon register-email-icon"></i>
            <input
              type="text"
              className="register-item-input register-email-input"
              placeholder="请输入邮箱" 
              onChange={this.onEmailInputChange}
              value={this.state.emailInputValue}
            />
            <div className={this.state.emailInputErrorMsg === '' ? "register-item-tip register-email-tip" : "register-item-tip register-email-tip active"}>
              <TipBox value={this.state.emailInputErrorMsg} />
            </div>
          </div>
          <div className="register-item register-password">
            <i className="register-item-icon register-password-icon"></i>
            <input
              type="password"
              className="register-item-input register-password-input"
              placeholder="请输入密码" 
              onChange={this.onPasswordInputChange}
              value={this.state.passwordInputValue}
            />
            <div className={this.state.passwordInputErrorMsg === '' ? "register-item-tip register-password-tip" : "register-item-tip register-password-tip active"}>
              <TipBox value={this.state.passwordInputErrorMsg} />
            </div>
          </div>
          <div className="register-item register-submit">
            <button 
              type="button" 
              className="register-submit-btn" 
              onClick={this.onSubmit}>创建账户
            </button>
          </div>
          </div>
          <div className="register-login">
            <span className="register-login-text">
              已有账户? 
              <Link
                to="/login"
                className="login-link-item login-link-forgot"
              > 登 录 </Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export { Register as View }
