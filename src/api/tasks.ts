import axios from './index'
import type { Task } from '@/layouts/components/task/types/task'

const URLS = {
  tasks: '/tasks',
}

export const getTasks = <T>(config = {}) => axios.get<T>(URLS.tasks, config)
export const addTask = (payload: Task, config = {}) =>
  axios.post(URLS.tasks, payload, config)
export const deleteTask = (taskId: string, config = {}) =>
  axios.delete(URLS.tasks + '/' + taskId, config)
export const getTaskDetail = <T>(taskId: string, config = {}) =>
  axios.get<T>(`${URLS.tasks}/${taskId}?_embed=taskItems`, config)

export const getAllTaskDetails = <T>(config = {}) =>
  axios.get<T>(`${URLS.tasks}?_embed=taskItems`, config)
export const changeTaskTitle = (task: Task, config = {}) =>
  axios.put(URLS.tasks + '/' + task.id, task, config)
