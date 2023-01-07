import { ref } from 'vue';
import { getAllTaskDetails, getTaskDetail } from '@/api/tasks';
import { TaskDetail } from '@/views/main/types';

const taskDetails = ref<TaskDetail[]>([]);
const fetchTaskDetailsLoading = ref(false);

const fetchTaskDetails = async (id: string) => {
  fetchTaskDetailsLoading.value = true;
  if (id === 'all') {
    return getAllTaskDetails<TaskDetail[]>()
      .then(({ data }) => {
        taskDetails.value = data;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        fetchTaskDetailsLoading.value = true;
      });
  } else {
    return getTaskDetail<TaskDetail>(id as string)
      .then(({ data }) => {
        taskDetails.value = [data];
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        fetchTaskDetailsLoading.value = true;
      });
  }
};

export const useTaskDetail = () => {
  return {
    taskDetails,
    fetchTaskDetails,
    fetchTaskDetailsLoading,
  };
};
