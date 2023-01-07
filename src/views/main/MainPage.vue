<template>
  <BaseLayout>
    <template #aside>
      <LayoutSidebar />
    </template>
    <template #default>
      <div class="main-wrapper">
        <TaskDetail v-for="task in tasks" :task-detail="task" :key="task.id" />
      </div>
    </template>
  </BaseLayout>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BaseLayout, useBaseLayout } from '@/layouts/composables/useBaseLayout.js';
import LayoutSidebar from '@/layouts/LayoutSidebar.vue';
import TaskDetailComponent from '@/views/main/components/TaskDetail.vue';
import { useTaskDetail } from '@/views/main/composables/useTaskDetail';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  async setup() {
    const { LAYOUTS, setLayout } = useBaseLayout();
    const { taskDetails, fetchTaskDetails, fetchTaskDetailsLoading } = useTaskDetail();
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    if (!id)
      return router.push({
        name: 'MainPage',
      });

    watch(
      () => route.params.id,
      () => fetchTaskDetails(route.params.id as string),
      {
        immediate: true,
      },
    );

    return {
      setLayout,
      LAYOUTS,
      tasks: taskDetails,
      fetchTaskDetailsLoading,
    };
  },
  components: {
    TaskDetail: TaskDetailComponent,
    BaseLayout,
    LayoutSidebar,
  },
});
</script>

<style lang="scss">
.main-wrapper {
  padding: 56px;
}
</style>
