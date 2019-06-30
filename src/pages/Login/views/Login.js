import React from 'react'
import { message } from 'antd'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  state = {
    emailInputFocused: false,
    passwordInputFocused: false,
    emailInputValue: '',
    passwordInputValue: '',
  }

  // 邮箱输入框获取焦点
  onEmailInputFocus = () => {
    this.setState({ emailInputFocused: true })
  }

  // 邮箱输入框失去焦点
  onEmailInputBlur = () => {
    if (this.state.emailInputValue.trim() !== '') return
    this.setState({ emailInputFocused: false })
  }

  // 监听邮箱输入框中值的变化
  onEmailInputChange = (event) => {
    this.setState({ emailInputValue: event.target.value })
  }

  // 密码输入框获取焦点
  onPasswordInputFocus = () => {
    this.setState({ passwordInputFocused: true })
  }

  // 密码输入框失去焦点
  onPasswordInputBlur = () => {
    if (this.state.passwordInputValue.trim() !== '') return
    this.setState({ passwordInputFocused: false })
  }

  // 监听密码输入框中值的变化
  onPasswordInputChange = (event) => {
    this.setState({ passwordInputValue: event.target.value })
  }

  // 登陆
  onSignin = () => {
    const {
      emailInputValue,
      passwordInputValue
    } = this.state

    if (emailInputValue === '' || passwordInputValue === '') {
      message.warning('请完善登陆信息')
      return
    }

    // console.log(store.dispatch({ type: 'LOGIN' }))
    // store.dispatch({ type: 'LOGIN_ASYNC' })

    // // 派发 action...
    // this.context.store.dispatch(login(emailInputValue, passwordInputValue));
    // this.context.store.dispatch(authActions.setAuthenticate(true));
  }

  render() {
    const emailPlaceholderClass = this.state.emailInputFocused ? 'active' : ''
    const passwordPlaceholderClass = this.state.passwordInputFocused ? 'active' : ''

    return (
      <div className="main">
        <div className="login">
          <div className="login-logo">
            <i className="login-logo-icon"></i>
          </div>
          <div className="login-inner">
            <div className="login-item login-email">
              <i className="login-item-icon login-email-icon"></i>
              <input
                type="text" 
                autoFocus
                className="login-item-input login-email-input"
                onFocus={this.onEmailInputFocus}
                onBlur={this.onEmailInputBlur}
                onChange={this.onEmailInputChange}
                value={this.emailInputValue}
              />
              <span
                className={"login-item-placeholder login-email-placeholder "+ emailPlaceholderClass}>
                Email
              </span>
            </div>
            <div className="login-item login-password">
              <i className="login-item-icon login-password-icon"></i>
              <input 
                type="password" 
                className="login-item-input login-password-input"
                onFocus={this.onPasswordInputFocus}
                onBlur={this.onPasswordInputBlur}
                onChange={this.onPasswordInputChange}
                value={this.passwordInputValue}
              />
              <span
                className={"login-item-placeholder login-password-placeholder " + passwordPlaceholderClass}>
                Password
              </span	>
            </div>
            <div className="login-item login-submit">
              <button type="button" className="login-submit-signin" onClick={this.onSignin}>
                Sign in
              </button>
            </div>
            <div className="login-item login-link">
              <Link
                to="/findpwd"
                className="login-link-item login-link-forgot"
              >Forgot your password?</Link>
              <Link
                to="/register"
                className="login-link-item login-link-register"
              >Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
