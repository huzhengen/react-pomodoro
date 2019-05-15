import * as React from 'react';
import { Input, Icon, Button } from 'antd';
import axios from 'src/config/axios'
import { Link } from 'react-router-dom';
import './Login.scss'

interface ILoginState {
  account: string,
  password: string,
}

class Login extends React.Component<any, ILoginState> {
  constructor(props: any) {
    super(props)
    this.state = {
      account: '',
      password: '',
    }
  }

  onChange = (key: keyof ILoginState, value: string) => {
    console.log(value)
    console.log(this.state)
    const newState = {}
    newState[key] = value;
    this.setState(newState)
  }


  submit = async () => {
    const { account, password } = this.state;
    try {
      await axios.post('sign_in/user', {
        account,
        password,
      })
      this.props.history.push('/')
    } catch (e) {
      throw new Error(e)
    }
  }


  public render() {
    const { account, password } = this.state;
    return (
      <div className="login" id="login">
        <h1>登录</h1>
        <Input
          placeholder="输入用户名"
          value={account}
          onChange={(e) => this.onChange('account', e.target.value)}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <Input.Password placeholder="输入密码" value={password}
          onChange={(e) => this.onChange('password', e.target.value)}
        />
        <Button className="loginButton" type="primary" onClick={this.submit}>登录</Button>
        <p>如果您还没有账号，<Link to="/signUp">去注册</Link></p>
      </div>
    )
  }
}

export default Login;