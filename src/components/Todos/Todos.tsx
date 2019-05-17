import * as React from 'react';
import TodoInput from 'src/components/Todos/TodoInput'
import TodoItem from 'src/components/Todos/TodoItem'
import axios from 'src/config/axios'
import './Todos.scss'

interface ITodosState {
  todos: any[]
}

class Todos extends React.Component<any, ITodosState> {
  constructor(props: any) {
    super(props)
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    this.getTodos()
  }

  addTodo = async (params: any) => {
    const { todos } = this.state;
    try {
      const response = await axios.post('todos', params)
      this.setState({ todos: [response.data.resource, ...todos] })
    } catch (e) {
      throw new Error(e)
    }
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos')
      const todos = response.data.resources.map((t: any) => Object.assign({}, t, { editting: false }))
      this.setState({ todos })
    } catch (e) {
      throw new Error(e)
    }
  }

  updateTodo = async (id: number, params: any) => {
    const { todos } = this.state;
    try {
      const response = await axios.put(`todos/${id}`, params)
      const newTodos = todos.map(t => {
        if (id === t.id) {
          return response.data.resource
        } else {
          return t;
        }
      })
      this.setState({ todos: newTodos })
    } catch (e) { throw new Error(e) }
  }

  toEditting = (id: number) => {
    const { todos } = this.state;
    const newTodos = todos.map(t => {
      if (id === t.id) {
        return Object.assign({}, t, { editting: true })
      } else {
        return Object.assign({}, t, { editting: false })
      }
    })
    this.setState({ todos: newTodos })
  }

  public render() {
    return (
      <div className="todos" id="todos">
        <TodoInput addTodo={(params: any) => this.addTodo(params)} />
        <main>
          {
            this.state.todos.map(t => <TodoItem key={t.id} {...t}
              update={this.updateTodo}
              toEditting={this.toEditting}
            />)
          }
        </main>
      </div>
    )
  }
}

export default Todos;