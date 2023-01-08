import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
import { TaskDetail, TaskItem } from '@/components/taskDetail/types'
import * as taskApi from '@/api/tasks'
import * as taskItemApi from '@/api/taskItems'
import { Task } from '@/components/task/types/task'
import { getRandomUUID } from '@/helpers/generateRandomUID'
import { useTaskStore } from '@/store/task'

export const useTaskDetailStore = defineStore('taskDetail', () => {
  const toast = useToast()
  const taskStore = useTaskStore()

  const taskDetails = ref<TaskDetail[]>([])
  const fetchTaskDetailsLoading = ref(false)

  const fetchTaskDetails = async (id: string) => {
    fetchTaskDetailsLoading.value = true
    if (id === 'all') {
      return taskApi
        .getAllTaskDetails<TaskDetail[]>()
        .then(({ data }) => {
          taskDetails.value = data
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          fetchTaskDetailsLoading.value = true
        })
    } else {
      return taskApi
        .getTaskDetail<TaskDetail>(id as string)
        .then(({ data }) => {
          taskDetails.value = [data]
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          fetchTaskDetailsLoading.value = true
        })
    }
  }

  const fetchMarkAsDoneLoading = ref(false)
  const fetchMarkTaskAsDone = (taskItem: TaskItem, isDoneState: boolean) => {
    fetchMarkAsDoneLoading.value = true
    return taskItemApi
      .markAsDone({
        ...taskItem,
        done: isDoneState,
      })
      .then(() => {
        taskDetails.value.forEach((taskDetail) => {
          taskDetail.taskItems.forEach((taskDetailItem) => {
            if (taskDetailItem.id === taskItem.id) {
              taskDetailItem.done = isDoneState
            }
          })
        })
      })
      .catch(() => {
        toast.error('Не удалось отметить задачу завершенным')
      })
      .finally(() => {
        fetchMarkAsDoneLoading.value = false
      })
  }

  const fetchAddTaskItemLoading = ref(false)
  const fetchAddTaskItem = (taskItem: TaskItem) => {
    fetchAddTaskItemLoading.value = true
    return taskItemApi
      .addTaskItem(taskItem)
      .then(() => {
        const foundTask = taskDetails.value.find((taskDetail) => taskDetail.id === taskItem.taskId)
        if (!foundTask) return
        foundTask.taskItems.push(taskItem)
      })
      .catch(() => {
        toast.error('Не удалось добавить задачу')
      })
      .finally(() => {
        fetchAddTaskItemLoading.value = false
      })
  }

  const fetchChangeTitleLoading = ref(false)
  const fetchChangeTitle = (taskId: string, newTitle: string) => {
    const taskDetail = taskDetails.value.find((task) => task.id === taskId)
    if (!taskDetail) return toast.error('Нет задачи с такой id')
    fetchChangeTitleLoading.value = true
    const taskWithChangedTitle: Task = {
      id: taskId,
      name: newTitle,
      color: taskDetail.color,
    }

    return taskApi
      .changeTaskTitle(taskWithChangedTitle)
      .then(() => {
        taskDetail.name = newTitle
        taskStore.changeTaskTitle(taskWithChangedTitle.id, taskWithChangedTitle.name)
      })
      .catch(() => {
        toast.error('Не удалось поменять название задачи')
      })
      .finally(() => {
        fetchChangeTitleLoading.value = false
      })
  }

  const generateDefaultTaskItem = (): TaskItem => ({
    id: getRandomUUID(),
    done: false,
    taskId: '',
    text: '',
  })

  return {
    taskDetails,
    fetchTaskDetails,
    fetchTaskDetailsLoading,
    fetchMarkTaskAsDone,
    fetchMarkAsDoneLoading,
    fetchAddTaskItem,
    fetchAddTaskItemLoading,
    generateDefaultTaskItem,
    fetchChangeTitle,
    fetchChangeTitleLoading,
  }
})
