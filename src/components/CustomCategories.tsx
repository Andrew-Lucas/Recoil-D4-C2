import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { customCategories, toDosCategory } from "../atom"

function CustomCategories() {
  const setCustomCategory = useSetRecoilState(customCategories)
  const setCurrentCategory = useSetRecoilState(toDosCategory)
  const { register, handleSubmit, reset } = useForm<{ categoryName: string }>()
  const onValid = (data: { categoryName: string }) => {
    const { categoryName } = data
    setCustomCategory((prevCategories) => {
      const categoryExists = prevCategories.find(
        (category) => category === categoryName
      )
      if (
        categoryExists ||
        categoryName === 'Todo' ||
        categoryName === 'Doing' ||
        categoryName === 'Done'
      )
        return prevCategories
      return [...prevCategories, categoryName]
    })
    setCurrentCategory(categoryName)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <label htmlFor="category-name">Create New Category: </label>
      <input
        {...register('categoryName')}
        id="category-name"
        placeholder="Write Category Name"
      />
      <input type="submit" value="Save Category" />
    </form>
  )
}

export default CustomCategories
