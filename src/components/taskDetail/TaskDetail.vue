<template>
  <div class="task-detail">
    <TaskDetailHeader
      :text="taskDetail.name"
      :color="taskDetail.color"
      :can-edit="!showAll"
      @changeTitle="
        (changedText) => fetchChangeTitle(taskDetail.id, changedText)
      "
      :loading="fetchChangeTitleLoading"
    />
    <TaskDetailHorizontalLine />
    <TaskDetailItem
      v-for="taskItem in taskDetail.taskItems"
      :id="taskItem.id"
      :key="taskItem.id"
      :label="taskItem.text"
      :checked="taskItem.done"
      @onChange="fetchMarkTaskAsDone(taskItem, !taskItem.done)"
      @onDelete="() => console.log('Delete')"
    />
    <TaskDetailAddItem
      class="task-detail__add"
      :can-add="!showAll"
      v-model="taskItemText"
      v-model:show-add-task-fields="showAddFields"
      :add-task-loading="fetchAddTaskItemLoading"
      @addTaskItem="onAddTaskItem"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { TaskDetail } from './/types'
import type { PropType } from 'vue'
import TaskDetailHorizontalLine from './components/TaskDetailHorizontalLine.vue'
import TaskDetailHeader from './components/TaskDetailHeader.vue'
import TaskDetailItem from './components/TaskDetailItem.vue'
import TaskDetailAddItem from './/components/TaskDetailAddItem.vue'
import { useTaskDetailStore } from '@/store/taskDetail'

export default defineComponent({
  props: {
    taskDetail: {
      type: Object as PropType<TaskDetail>,
      required: true,
    },
    showAll: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const {
      generateDefaultTaskItem,
      fetchAddTaskItem,
      fetchMarkTaskAsDone,
      fetchMarkAsDoneLoading,
      fetchAddTaskItemLoading,
      fetchChangeTitle,
      fetchChangeTitleLoading,
    } = useTaskDetailStore()

    const taskItemText = ref('')
    const showAddFields = ref(false)

    const onAddTaskItem = async () => {
      const newTaskItem = generateDefaultTaskItem()
      newTaskItem.taskId = props.taskDetail.id
      newTaskItem.text = taskItemText.value
      await fetchAddTaskItem(newTaskItem)
      showAddFields.value = false
      taskItemText.value = ''
    }

    return {
      fetchMarkTaskAsDone,
      fetchMarkAsDoneLoading,
      taskItemText,
      showAddFields,
      onAddTaskItem,
      fetchAddTaskItemLoading,
      fetchChangeTitle,
      fetchChangeTitleLoading,
    }
  },
  components: {
    TaskDetailHeader,
    TaskDetailItem,
    TaskDetailHorizontalLine,
    TaskDetailAddItem,
  },
})
</script>
<style lang="scss" scoped>
.task-detail {
  &:not(:last-child) {
    margin-bottom: 40px;
  }

  &__add {
    margin-top: 20px;
  }
}
</style>
