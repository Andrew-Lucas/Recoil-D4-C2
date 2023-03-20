import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { EnumCategory, todosAtom } from '../atom'

interface iCreateTodoProps {
  currentCategory: EnumCategory
}
function CreateTodo({ currentCategory }: iCreateTodoProps) {
  const setAllTodos = useSetRecoilState(todosAtom)

  interface IForm {
    inputValue: string
  }
  const { register, handleSubmit, reset } = useForm<IForm>()
  const onValid = (data: IForm) => {
    const { inputValue } = data
    if (inputValue === '') return
    setAllTodos((prevToDos) => {
      const newToDos = [
        {
          text: inputValue,
          id: Date.now(),
          category: currentCategory,
        },
        ...prevToDos,
      ]
      return newToDos
    })
    reset()
  }
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('inputValue')} placeholder="Write Todo here" />
        <input type="submit" value="Add Task" />
      </form>
    </>
  )
}

export default CreateTodo
