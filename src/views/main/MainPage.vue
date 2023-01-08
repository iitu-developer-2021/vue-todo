<template>
  <BaseLayout>
    <template #aside>
      <LayoutSidebar />
    </template>
    <template #default>
      <div class="main-wrapper">
        <TaskDetail v-for="task in tasks" :task-detail="task" :key="task.id" :show-all="showAll" />
      </div>
    </template>
  </BaseLayout>
</template>
<script lang="ts">
import { defineComponent, watch, ref, watchEffect } from 'vue'
import { BaseLayout, useBaseLayout } from '@/layouts/composables/useBaseLayout.js'
import LayoutSidebar from '@/layouts/LayoutSidebar.vue'
import TaskDetailComponent from '@/components/taskDetail/TaskDetail.vue'
import { useTaskDetailStore } from '@/store/taskDetail'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

export default defineComponent({
  async setup() {
    const { LAYOUTS, setLayout } = useBaseLayout()
    const taskDetailStore = useTaskDetailStore()
    const { fetchTaskDetails } = taskDetailStore
    const { taskDetails, fetchTaskDetailsLoading } = storeToRefs(taskDetailStore)
    const route = useRoute()
    const showAll = ref(false)

    watch(
      () => route.params.id,
      async () => {
        fetchTaskDetails(route.params.id as string)
      },
      {
        immediate: true,
      }
    )

    watchEffect(() => {
      showAll.value = route.params.id === 'all'
    })

    return {
      showAll,
      setLayout,
      LAYOUTS,
      tasks: taskDetails,
      fetchTaskDetailsLoading,
    }
  },
  components: {
    TaskDetail: TaskDetailComponent,
    BaseLayout,
    LayoutSidebar,
  },
})
</script>

<style lang="scss">
.main-wrapper {
  padding: 56px;
}
</style>
