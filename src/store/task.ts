import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
import { Task } from '@/components/task/types/task'
import { getRandomUUID } from '@/helpers/generateRandomUID'
import * as taskApi from '@/api/tasks'

export const useTaskStore = defineStore('task', () => {
  const toast = useToast()
  const tasks = ref<Task[]>([])
  const setTasks = (newTasks: Task[]) => (tasks.value = newTasks)
  const addTask = (newTask: Task) => tasks.value.push(newTask)
  const deleteTask = (taskId: string) =>
    (tasks.value = tasks.value.filter((task) => task.id !== taskId))

  const changeTaskTitle = (taskId: string, newTaskTitle: string) => {
    const foundTask = tasks.value.find((task) => task.id === taskId)
    if (!foundTask) return
    foundTask.name = newTaskTitle
  }

  const getDefaultTask = (): Task => ({
    id: getRandomUUID(),
    name: '',
    color: 'gray',
  })

  // Получение списка задач
  const fetchTasks = () =>
    taskApi.getTasks<Task[]>().then((response) => {
      setTasks(response.data)
    })

  //Добавление задачи
  const fetchAddTaskLoading = ref(false)
  const fetchAddTask = (task: Task) => {
    fetchAddTaskLoading.value = true
    return taskApi
      .addTask(task)
      .then(() => {
        addTask(task)
      })
      .catch((e) => {
        toast.error('Не удалось добавить задачу: ' + e.message)
      })
      .finally(() => {
        fetchAddTaskLoading.value = false
      })
  }

  // Удаление задачи
  const fetchDeleteTaskLoadingList = ref<string[]>([])

  const fetchDeleteTask = (taskId: string) => {
    fetchDeleteTaskLoadingList.value.push(taskId)
    return taskApi
      .deleteTask(taskId)
      .then(() => {
        deleteTask(taskId)
      })
      .catch((e) => {
        toast.error('Не удалось удалить задачу: ' + e.message)
      })
      .finally(() => {
        const foundTaskIndex = fetchDeleteTaskLoadingList.value.indexOf(taskId)
        foundTaskIndex !== -1 && fetchDeleteTaskLoadingList.value.splice(foundTaskIndex, 1)
      })
  }

  return {
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
    changeTaskTitle,
  }
})
