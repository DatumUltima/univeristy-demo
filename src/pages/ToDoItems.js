import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { styles } from './styles';
import Nav from './Nav'

import { createTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import { Redirect } from 'react-router-dom';
import { getUser } from './Authentication';

const initialState = { name: '', description: '' };


class ToDoItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: initialState,
            redirectLogin: false,
            loaded: false,
            todos: []
        };

        this.fetchTodos = this.fetchTodos.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    async componentDidMount() {
        const user = await getUser();
        if ( user != null) {
            this.fetchTodos()
        } else {
            this.setState({ redirectLogin: true })
        }
    }

    setInput(key, value) {
        this.setState({
            formState: {
                ...this.state.formState, [key]: value
            }
        })
    }

    async fetchTodos() {
        try {
            const todoData = await API.graphql(graphqlOperation(listTodos))
            const todos = todoData.data.listTodos.items
            this.setState({ todos, loaded: true })
        } catch (err) { console.err(err); console.log('error fetching todos') }
    }

    async addTodo() {
        try {
            if (!this.state.formState.name || !this.state.formState.description) return
            const todo = { ...this.state.formState }
            this.setState({ todos: [...this.state.todos, todo] })
            this.setState({ formState: initialState })
            await API.graphql(graphqlOperation(createTodo, { input: todo }))
        } catch (err) {
            console.log('error creating todo:', err)
        }
    }

    render() {

        if (this.state.redirectLogin) {
            return (<Redirect to="/login" source="/todo" />)
        }

        if (!this.state.loaded) {
            return (
                <div>
                    loading...
                </div>
            )
        }

        let formState = this.state.formState;
        let todos = this.state.todos;
        return (
          <div >
            <Nav />
            <div className="container">
              <h2>Amplify Todos</h2>
              <input
                onChange={(event) => this.setInput("name", event.target.value)}
                style={styles.input}
                value={formState.name}
                placeholder="Name"
              />
              <input
                onChange={(event) =>
                  this.setInput("description", event.target.value)
                }
                style={styles.input}
                value={formState.description}
                placeholder="Description"
              />
              <button style={styles.button} onClick={this.addTodo}>
                Create Todo
              </button>
              {todos.map((todo, index) => (
                <div key={todo.id ? todo.id : index} style={styles.todo}>
                  <p style={styles.todoName}>{todo.name}</p>
                  <p style={styles.todoDescription}>{todo.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
}


export default ToDoItems