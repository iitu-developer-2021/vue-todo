import { useApi } from '@/api/composables/useApi';
import { getTasks } from '@/api/tasks';
import type { Task } from '@/layouts/layout-parts/components/task/types/task';

const { data: tasks, exec: fetchTasks } = useApi('fetchTasks', getTasks, {
  responseAdapter: (response) => response.data.tasks,
  throwError: true,
});

const setTasks = (newTasks: Task[]) => (tasks.value = newTasks);
const addTask = (newTask: Task) => tasks.value.push(newTask);

export const useTaskList = () => ({
  tasks,
  setTasks,
  addTask,
  fetchTasks,
});
