import React from "react"
import TodoList from "./Todo/TodoList"
import Context from "./context"
// import AddTodo from "./Todo/AddTodo"
import Loader from "./Loader"
import Modal from './Modal/Modal'

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then(todos => {
        setTodos(todos)
        setLoading(false)
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          complited: false,
          id: Date.now(),
        },
      ])
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>React Tutorial</h1>
        <Modal />

        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        
        {loading && <Loader />}

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : (
          loading ? null : <p>Список пуст</p>
        )}
      </div>
    </Context.Provider>
  )
}

export default App
