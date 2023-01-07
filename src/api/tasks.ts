import axios from './index';
import type { Task } from '@/layouts/layout-parts/components/task/types/task';

const URLS = {
  tasks: '/tasks',
};

export const getTasks = <T>(config = {}) => axios.get<T>(URLS.tasks, config);
export const addTask = (payload: Task, config = {}) => axios.post(URLS.tasks, payload, config);
export const deleteTask = (taskId: string, config = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(axios.delete(URLS.tasks + '/' + taskId, config));
    }, 5000);
  });
};
