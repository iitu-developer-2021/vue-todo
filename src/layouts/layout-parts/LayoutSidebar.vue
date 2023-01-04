<template>
  <div class="sidebar">Sidebar</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '@/components/common/task/TaskList.vue';

export default defineComponent({
  setup() {
    const tasks = [
      {
        id: 1,
        color: 'red',
        text: 'Frontend some text',
      },
      {
        id: 2,
        color: 'green',
        text: 'Frontend some text seconds',
      },
    ];
    return {
      tasks,
    };
  },
  components: {
    TaskList,
  },
});
</script>
<style lang="scss">
.sidebar {
  background: $sidebarDefaultBackground;
  height: 100%;
  padding: 56px 20px;
  overflow-y: auto;
}
</style>
