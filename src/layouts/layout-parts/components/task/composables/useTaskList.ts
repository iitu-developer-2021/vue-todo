import { ref } from 'vue';
import * as taskApi from '@/api/tasks';
import type { Task } from '@/layouts/layout-parts/components/task/types/task';
import { useToast } from 'vue-toastification';
import { getRandomUUID } from '@/layouts/helpers/generateRandomUID';

const toast = useToast();
const tasks = ref<Task[]>([]);
const setTasks = (newTasks: Task[]) => (tasks.value = newTasks);
const addTask = (newTask: Task) => tasks.value.push(newTask);
const deleteTask = (taskId: string) => (tasks.value = tasks.value.filter((task) => task.id !== taskId));

const getDefaultTask = (): Task => ({
  id: getRandomUUID(),
  name: '',
  color: 'gray',
});

// Получение списка задач
const fetchTasks = () =>
  taskApi.getTasks<Task[]>().then((response) => {
    setTasks(response.data);
  });

//Добавление задачи
const fetchAddTaskLoading = ref(false);
const fetchAddTask = (task: Task) => {
  fetchAddTaskLoading.value = true;
  return taskApi
    .addTask(task)
    .then(() => {
      addTask(task);
    })
    .catch((e) => {
      toast.error('Не удалось добавить задачу: ' + e.message);
    })
    .finally(() => {
      fetchAddTaskLoading.value = false;
    });
};

// Удаление задачи

const fetchDeleteTaskLoadingList = ref<string[]>([]);

const fetchDeleteTask = (taskId: string) => {
  fetchDeleteTaskLoadingList.value.push(taskId);
  return taskApi
    .deleteTask(taskId)
    .then(() => {
      deleteTask(taskId);
    })
    .catch((e) => {
      toast.error('Не удалось удалить задачу: ' + e.message);
    })
    .finally(() => {
      const foundTaskIndex = fetchDeleteTaskLoadingList.value.indexOf(taskId);
      foundTaskIndex !== -1 && fetchDeleteTaskLoadingList.value.splice(foundTaskIndex, 1);
    });
};

export const useTaskList = () => ({
  tasks,
  setTasks,
  addTask,
  fetchTasks,
  fetchAddTask,
  fetchAddTaskLoading,
  fetchDeleteTask,
  fetchDeleteTaskLoadingList,
  deleteTask,
  getDefaultTask,
});
