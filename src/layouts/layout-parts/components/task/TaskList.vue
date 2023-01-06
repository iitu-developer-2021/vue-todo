<template>
  <div>
    <ul class="task-list">
      <TaskItem name="Все задачи" class="task-list__all">
        <BaseSvgIcon name="list" width="12px" height="12px" />
      </TaskItem>
    </ul>
    <ul class="task-list task-list--items">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :color="task.color"
        :name="task.name"
        tag="li"
        class="task-list__item"
        deletable
      />
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TaskItem from '@/layouts/layout-parts/components/task/TaskItem.vue';
import { useTaskList } from '@/layouts/layout-parts/components/task/composables/useTaskList';

export default defineComponent({
  async setup() {
    const { tasks, fetchTasks } = useTaskList();

    await fetchTasks();

    return {
      tasks,
    };
  },
  components: {
    TaskItem,
  },
});
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
