import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const todosAtom = atom<IToDos[]>({
  key: 'ToDos',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export enum EnumCategory {
  'TO_DO' = 'Todo',
  'DOING' = 'doing',
  'DONE' = 'done',
}

export interface IToDos {
  id: number
  category: EnumCategory | string
  text: string
}

export const customCategories = atom<string[]>({
  key: 'Custom Categories',
  default: [],
  effects_UNSTABLE: [persistAtom],
})


export const toDosCategory = atom({
  key: 'ToDoCategory',
  default: EnumCategory.TO_DO,
  effects_UNSTABLE: [persistAtom],
})

export const toDoSelector = selector({
  key: 'ToDoSelector',
  get: ({ get }) => {
    const AllToDos = get(todosAtom)
    const selectedCatogory = get(toDosCategory)
    return AllToDos.filter((ToDo) => ToDo.category === selectedCatogory)
  },
})
