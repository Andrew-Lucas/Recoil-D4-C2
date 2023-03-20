import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { todosAtom, toDoSelector } from '../atom'
import CategoryButtons from './CategoryButtons'

interface ICustomCategory {
  customCategory: string[]
}
function DisplayTodoList({ customCategory }: ICustomCategory) {
  const CurrentToDos = useRecoilValue(toDoSelector)

  const setTodos = useSetRecoilState(todosAtom)
  const deleteTodo = (todoId: number) => {
    setTodos((prevTodos) => {
      const newTodoArray = prevTodos.filter((todo) => todo.id !== todoId)
      console.log(newTodoArray)
      return newTodoArray
    })
  }

  return (
    <>
      <ul>
        {CurrentToDos.map((todos) => (
          <li key={todos.id}>
            <FontAwesomeIcon
              style={{ marginRight: '10px', cursor: 'pointer' }}
              color="grey"
              onClick={() => deleteTodo(todos.id)}
              icon={faTrash}
            />
            {todos.text}
            <CategoryButtons todos={todos} customCategory={customCategory} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default DisplayTodoList
