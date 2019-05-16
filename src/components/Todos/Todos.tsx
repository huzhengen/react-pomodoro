import * as React from 'react';
import TodoInput from 'src/components/Todos/TodoInput'
import axios from 'src/config/axios'
import './Todos.scss'

class Todos extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      user: {}
    }
  }

  addTodo = async (params: any) => {
    try {
      const response = await axios.post('todos', params)
      console.log(response);
    } catch (e) {
      throw new Error(e)
    }
  }

  public render() {
    return (
      <div className="todos" id="todos">
        <TodoInput addTodo={(params: any) => this.addTodo(params)} />
      </div>
    )
  }
}

export default Todos;