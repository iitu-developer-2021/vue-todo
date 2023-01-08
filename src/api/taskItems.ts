import axios from './index'
import type { TaskItem } from '@/views/main/types'

const URLS = {
  taskItems: '/taskItems',
}

export const markAsDone = (taskItem: TaskItem, config = {}) =>
  axios.put(URLS.taskItems + '/' + taskItem.id, taskItem, config)

export const addTaskItem = (taskItem: TaskItem, config = {}) =>
  axios.post(URLS.taskItems, taskItem, config)
