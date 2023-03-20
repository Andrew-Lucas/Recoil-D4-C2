import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  customCategories,
  EnumCategory,
  todosAtom,
  toDosCategory,
} from './atom'
import CreateTodo from './components/CreateTodo'
import CustomCategories from './components/CustomCategories'
import DisplayTodoList from './components/DisplayTodoList'

function App() {
  const allToDos = useRecoilValue(todosAtom)
  console.log('allToDos', allToDos)

  const [currentCategory, setCurrentCategory] = useRecoilState(toDosCategory)

  const customCategory = useRecoilValue(customCategories)
  return (
    <>
      <CustomCategories />
      <label htmlFor="switch-category">Switch Category: </label>
      <select
        style={{ marginTop: '25px' }}
        id="switch-category"
        value={currentCategory}
        onInput={(event: React.FormEvent<HTMLSelectElement>) => {
          setCurrentCategory(event.currentTarget.value as any)
        }}>
        <option value={EnumCategory.TO_DO}>Todo</option>
        <option value={EnumCategory.DONE}>Done</option>
        <option value={EnumCategory.DOING}>Doing</option>
        {customCategory.map((custom, index) => (
          <option key={index} value={custom}>
            {custom}
          </option>
        ))}
      </select>
      <h2>
        <span>Todo List: </span>
        <span>{currentCategory}</span>
      </h2>
      <div>
        <CreateTodo currentCategory={currentCategory} />
        <DisplayTodoList customCategory={customCategory} />
      </div>
    </>
  )
}

export default App
