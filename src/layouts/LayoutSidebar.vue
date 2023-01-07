<template>
  <div class="sidebar">
    <TaskList />
    <TaskAdd />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '@/layouts/components/task/TaskList.vue';
import TaskAdd from '@/layouts/components/task/TaskAdd.vue';

export default defineComponent({
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
