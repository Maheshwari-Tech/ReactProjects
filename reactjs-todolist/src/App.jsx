import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

  // stateful variable
  const [todos, setTodos] = useState([
    'Go to Gym',
    'Learn React',
    'Complete Task 1',
    'Complete Task 2'
  ])

  const [todoValue, setTodoValue] = useState('')

 // CRUD functions  
  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    setTodos(newTodoList)
    persistData(newTodoList)
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !=index
    })
    setTodos(newTodoList)
    persistData(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({
      todos: newList
    }))
  }

  // using this to have item saved even after refresh
  useEffect( () => {
    if(!localStorage) return;
    let localTodos = localStorage.getItem('todos')
    if(!localTodos) return;
    console.log(localTodos)

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])
  
  return (
    <>
      <TodoInput todoValue ={todoValue} setTodoValue = {setTodoValue} handleAddTodos = {handleAddTodos} />
      <TodoList handleDeleteTodo = {handleDeleteTodo} handleEditTodo = {handleEditTodo} todos = {todos}  />
    </>
  )
}

export default App

// return jsx from function -- html + js .. add { } for js
// biggest parent functional component