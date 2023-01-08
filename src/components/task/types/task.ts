import type { TaskItemColorKeys } from '../consts/taskItemColors'

export interface Task {
  id: string
  name: string
  color: TaskItemColorKeys
}
