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
        @deleteTask="onDeleteTask(task)"
        deletable
        class="task-list__item"
      />
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import TaskItem from '@/layouts/layout-parts/components/task/TaskItem.vue';
import type { Task } from '@/layouts/layout-parts/components/task/types/task';

export default defineComponent({
  props: {
    tasks: {
      type: Array as PropType<Array<Task>>,
      default: () => [],
    },
  },
  emits: {
    deleteTask({ id, color, name }: Task) {
      return !(!id || !color || !name);
    },
  },
  methods: {
    onDeleteTask(task: Task) {
      this.$emit('deleteTask', task);
    },
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
    max-height: 100px;
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
