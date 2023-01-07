<template>
  <div class="task-detail">
    <TaskDetailHeader :text="taskDetail.name" :color="taskDetail.color" />
    <TaskDetailHorizontalLine />
    <TaskDetailItem
      v-for="taskItem in taskDetail.taskItems"
      :id="taskItem.id"
      :key="taskItem.id"
      :label="taskItem.text"
      :checked="taskItem.done"
      @onChange="() => console.log('Change')"
      @onDelete="() => console.log('Delete')"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { TaskDetail } from '@/views/main/types';
import type { PropType } from 'vue';
import TaskDetailHorizontalLine from '@/views/main/components/TaskDetailHorizontalLine.vue';
import TaskDetailHeader from '@/views/main/components/TaskDetailHeader.vue';
import TaskDetailItem from '@/views/main/components/TaskDetailItem.vue';

export default defineComponent({
  props: {
    taskDetail: {
      type: Object as PropType<TaskDetail>,
      required: true,
    },
  },
  components: {
    TaskDetailHeader,
    TaskDetailItem,
    TaskDetailHorizontalLine,
  },
});
</script>
<style lang="scss" scoped>
.task-detail {
  &:not(:last-child) {
    margin-bottom: 40px;
  }
}
</style>
