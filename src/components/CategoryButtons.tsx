import { useSetRecoilState } from 'recoil'
import { EnumCategory, IToDos, todosAtom } from '../atom'
import styled from 'styled-components'

const Buttons = styled.button`
  margin: 0 3.5px;
`

interface ICategoryButtons {
  todos: IToDos
  customCategory: string[]
}
function CategoryButtons({ todos, customCategory }: ICategoryButtons) {
  const setAllTodos = useSetRecoilState(todosAtom)
  const changeCategory = (todoID: number, clickedCategory: EnumCategory) => {
    setAllTodos((prevTodos) => {
      const toDoIndex = prevTodos.findIndex((todo) => todo.id === todoID)
      const before = prevTodos.slice(0, toDoIndex)
      const after = prevTodos.slice(toDoIndex + 1)
      return [
        ...before,
        {
          text: prevTodos[toDoIndex].text,
          category: clickedCategory,
          id: prevTodos[toDoIndex].id,
        },
        ...after,
      ]
    })
  }

  return (
    <>
      {EnumCategory.TO_DO !== todos.category && (
        <Buttons onClick={() => changeCategory(todos.id, EnumCategory.TO_DO)}>
          Todo
        </Buttons>
      )}
      {EnumCategory.DOING !== todos.category && (
        <Buttons onClick={() => changeCategory(todos.id, EnumCategory.DOING)}>
          Doing
        </Buttons>
      )}
      {EnumCategory.DONE !== todos.category && (
        <Buttons onClick={() => changeCategory(todos.id, EnumCategory.DONE)}>
          Done
        </Buttons>
      )}
      {customCategory.map(
        (category, index) =>
          category !== todos.category && (
            <Buttons
              key={index}
              onClick={() => changeCategory(todos.id, category as any)}>
              {category}
            </Buttons>
          )
      )}
    </>
  )
}

export default CategoryButtons
