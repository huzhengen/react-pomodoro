import * as React from 'react';
import { Input, Tooltip, Icon, Button } from 'antd';
import axios from 'src/config/axios'

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
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConformation
      }).then(() => {
        console.log(123);
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  public render() {
    const { account, password, passwordConformation } = this.state;
    return (
      <div className="signup">
        <Input
          placeholder="输入用户名"
          value={account}
          onChange={this.onChangeAccount}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={
            <Tooltip title="Extra information">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
        <Input.Password placeholder="输入密码" value={password}
          onChange={this.onChangePassword}
        />
        <Input.Password placeholder="重复密码" value={passwordConformation}
          onChange={this.onChangePasswordConformation}
        />
        <Button onClick={this.submit}>注册</Button>
      </div>
    )
  }
}

export default SignUp;