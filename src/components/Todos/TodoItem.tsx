import * as React from 'react';
import { Checkbox, Icon } from 'antd';
import classNames from 'classnames';
import './TodoItem.scss'

interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  editting: boolean
  update: (id: number, params: any) => void;
  toEditting: (id: number) => void
}

interface ITodoItemState {
  editText: string;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: any) {
    super(props)
    this.state = {
      editText: this.props.description
    }
  }

  update = (params: any) => {
    this.props.update(this.props.id, params)
  }

  toEditting = () => {
    this.props.toEditting(this.props.id)
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.update({ description: this.state.editText })
    }
  }

  public render() {
    const Editting = (
      <div className="editting">
        <input type="text" value={this.state.editText}
          onChange={e => this.setState({ editText: e.target.value })}
          onKeyUp={this.onKeyUp}
        />
        <div className="iconWrapper">
          <Icon type="enter" />
          <Icon type="delete" theme="filled"
            onClick={e => this.update({ deleted: true })}
          />
        </div>
      </div>
    )

    const Text = (
      <span className="text" onDoubleClick={this.toEditting}>{this.props.description}</span>
    )

    const todoItemClass = classNames({
      TodoItem: true,
      editting: this.props.editting,
      completed: this.props.completed,
    })

    return (
      <div className={todoItemClass} id="TodoItem">
        <Checkbox checked={this.props.completed}
          onChange={e => this.update({ completed: e.target.checked })}
        />
        {
          this.props.editting ?
            Editting :
            Text
        }
      </div>
    )
  }
}

export default TodoItem;