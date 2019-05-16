import * as React from 'react';
import axios from 'src/config/axios'
import { Menu, Dropdown, Icon } from 'antd';
import history from 'src/config/history'
import Todos from 'src/components/Todos/Todos'
import './Index.scss'

interface IRouter {
  history: any;
}

interface IIndexState {
  user: any;
}

const logout = () => {
  localStorage.setItem('x-token', '')
  history.push('/login')
}

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      个人设置
    </Menu.Item>
    <Menu.Item key="2" onClick={logout}>
      <Icon type="logout" />
      注销
    </Menu.Item>
  </Menu>
);

class Index extends React.Component<IRouter, IIndexState> {

  constructor(props: any) {
    super(props)
    this.state = {
      user: {}
    }
  }

  async componentWillMount() {
    await this.getMe()
  }
  getMe = async () => {
    const response = await axios.get('me')
    this.setState({ user: response.data })
  }


  public render() {
    return (
      <div className="index" id="index">
        <header>
          <div className="logo">番茄闹钟</div>
          <Dropdown overlay={menu}>
            <span>{this.state.user.account}<Icon type="down" style={{ marginLeft: 5 }} /></span>
          </Dropdown>
        </header>
        <main>
          <Todos />
        </main>
      </div>
    )
  }
}

export default Index;