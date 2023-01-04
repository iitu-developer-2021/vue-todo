<template>
  <div class="sidebar">
    <TaskList :tasks="tasks" />
    <TaskAdd />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '@/layouts/layout-parts/components/task/TaskList.vue';
import TaskAdd from '@/layouts/layout-parts/components/task/TaskAdd.vue';
import { Task } from '@/layouts/layout-parts/components/task/types/task';

export default defineComponent({
  setup() {
    const tasks: Task[] = [
      {
        id: '1',
        color: 'red',
        name: 'Frontend development',
      },
      {
        id: '1',
        color: 'pink',
        name: 'Frontend development and test',
      },
    ];
    return {
      tasks,
    };
  },
  components: {
    TaskList,
    TaskAdd,
  },
});
</script>
<style lang="scss">
.sidebar {
  background: $sidebarDefaultBackground;
  height: 100%;
  padding: 56px 20px;
}
</style>
