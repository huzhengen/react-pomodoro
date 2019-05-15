import * as React from 'react';
import { Input, Icon, Button } from 'antd';
import axios from 'src/config/axios'
import { Link } from 'react-router-dom';
import './SignUp.scss'

interface ISignUpState {
  account: string,
  password: string,
  passwordConformation: string
}

class SignUp extends React.Component<any, ISignUpState> {
  constructor(props: any) {
    super(props)
    this.state = {
      account: '',
      password: '',
      passwordConformation: ''
    }
  }

  onChange = (key: keyof ISignUpState, value: string) => {
    const newState = {}
    newState['key'] = value;
    this.setState(newState)
  }
  onChangeAccount = (e: any) => {
    this.setState({ account: e.target.value })
  }
  onChangePassword = (e: any) => {
    this.setState({ password: e.target.value })
  }
  onChangePasswordConformation = (e: any) => {
    this.setState({ passwordConformation: e.target.value })
  }
  submit = async () => {
    const { account, password, passwordConformation } = this.state;
    try {
      await axios.post('sign_in/user', {
        account,
        password,
        password_confirmation: passwordConformation
      })
      this.props.history.push('/')
    } catch (e) {
      throw new Error(e)
    }
  }

  public render() {
    const { account, password, passwordConformation } = this.state;
    return (
      <div className="signup" id="signup">
        <h1>注册</h1>
        <Input
          placeholder="输入用户名"
          value={account}
          onChange={(e) => this.onChange('account', e.target.value)}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

        />
        <Input.Password placeholder="输入密码" value={password}
          onChange={(e) => this.onChange('password', e.target.value)}
        />
        <Input.Password placeholder="重复密码" value={passwordConformation}
          onChange={(e) => this.onChange('passwordConformation', e.target.value)}
        />
        <Button className="signUpButton" type="primary" onClick={this.submit}>注册</Button>
        <p>如果您已经有账号，<Link to="/login">去登录</Link></p>
      </div>
    )
  }
}

export default SignUp;