import * as React from 'react';
import { Input, Icon } from 'antd';

interface ITodoInputState {
  description: string;
}

interface ITodoInputProps {
  addTodo: (params: any) => void
}

class TodoInput extends React.Component<ITodoInputProps, ITodoInputState>{
  constructor(props: any) {
    super(props)
    this.state = {
      description: ''
    }
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addTodo()
    }
  }

  addTodo = () => {
    this.props.addTodo({ description: this.state.description })
    this.setState({ description: '' })
  }

  public render() {
    const { description } = this.state;
    const suffix = description ? <Icon type="enter" onClick={this.addTodo} /> : <span />;
    return (
      <div className="todoinput" id="todoinput">
        <Input
          placeholder="输入待办事件"
          suffix={suffix}
          value={description}
          onChange={(e) => this.setState({ description: e.target.value })}
          onKeyUp={this.onKeyUp}
        />
      </div>
    )
  }
}

export default TodoInput;