<template>
  <div>
    <ul class="task-list">
      <TaskItem
        name="Все задачи"
        class="task-list__all"
        v-if="tasks && tasks.length > 0"
        to="/main/all"
      >
        <BaseSvgIcon name="list" width="12px" height="12px" />
      </TaskItem>
    </ul>
    <ul class="task-list task-list--items">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :color="task.color"
        :name="task.name"
        :to="'/main/' + task.id"
        tag="li"
        class="task-list__item"
        @deleteTask="fetchDeleteTask(task.id)"
        :loading="fetchDeleteTaskLoadingList.includes(task.id)"
        deletable
      />
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TaskItem from './components/TaskItem.vue'
import { useTaskStore } from '@/store/task'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  async setup() {
    const route = useRoute()
    const router = useRouter()

    const taskStore = useTaskStore()
    await taskStore.fetchTasks()

    const onFetchDeleteTask = async (taskId: string) => {
      await taskStore.fetchDeleteTask(taskId)
      if (route.params.id === taskId) {
        await router.push('/main')
      }
    }

    return {
      tasks: taskStore.tasks,
      fetchDeleteTask: onFetchDeleteTask,
      fetchDeleteTaskLoadingList: taskStore.fetchDeleteTaskLoadingList,
    }
  },
  components: {
    TaskItem,
  },
})
</script>
<style lang="scss" scoped>
.task-list {
  list-style: none;
  max-height: 100px;

  &--items {
    max-height: 350px;
    overflow-y: auto;
  }

  &__all {
    margin-bottom: 15px;
  }

  &__item {
    margin-bottom: 3px;
  }
}
</style>
