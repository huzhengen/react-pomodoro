import * as React from 'react';
import axios from 'src/config/axios'
import { Button } from 'antd';

interface IRouter {
  history: any;
}

interface IIndexState {
  user: any;
}

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
  logout = () => {
    localStorage.setItem('x-token', '')
    this.props.history.push('/login')
  }

  public render() {
    return (
      <div className="index">
        <p>欢迎，{this.state.user.account}</p>
        <Button onClick={this.logout}>注销</Button>
      </div>
    )
  }
}

export default Index;