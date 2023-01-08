import type { Task } from '@/components/task/types/task'

export interface TaskItem {
  text: string
  done: boolean
  id: string
  taskId: string
}

export interface TaskDetail extends Task {
  taskItems: Array<TaskItem>
}
