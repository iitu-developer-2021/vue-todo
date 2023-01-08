<template>
  <div class="add-task" :ref="(el) => (addPanelElement = el)">
    <button class="add-task__btn" @click.prevent="setShowOn">
      <BaseSvgIcon name="plus" width="10px" height="10px" color="#868686" />
      <span>{{ text }}</span>
    </button>
    <TaskAddPanel
      v-if="show"
      v-model="task.name"
      v-model:chosen-color="task.color"
      @closeAddPanel="onCloseAddPanel"
      @addTask="onAddTask"
      class="add-task__panel"
      :add-task-loading="fetchAddTaskLoading"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useToggleState } from '@/composables/useToggleState'
import { useTaskStore } from '@/store/task'
import { useOutsideClick } from '@/composables/useOutsideClick'
import TaskAddPanel from './components/TaskAddPanel.vue'
import type { Ref } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: 'Добавить папку',
    },
  },
  setup() {
    const { show, setShowOn, setShowOff } = useToggleState()
    const taskStore = useTaskStore()

    const task = ref(taskStore.getDefaultTask())
    const clearTask = () => (task.value = taskStore.getDefaultTask())

    const onAddTask = async () => {
      await taskStore.fetchAddTask({ ...task.value })
      clearTask()
    }

    const onCloseAddPanel = () => {
      setShowOff()
      clearTask()
    }

    const addPanelElement = ref<HTMLElement>()

    useOutsideClick(addPanelElement as Ref<HTMLElement>, () => {
      onCloseAddPanel()
    })

    return {
      show,
      task,
      setShowOn,
      onCloseAddPanel,
      onAddTask,
      fetchAddTaskLoading: taskStore.fetchAddTaskLoading,
      addPanelElement,
    }
  },
  components: {
    TaskAddPanel,
  },
})
</script>
<style lang="scss" scoped>
.add-task {
  position: relative;

  &__btn {
    border: none;
    outline: none;
    background: transparent;
    display: flex;
    padding: 12px;
    align-items: center;
    transition: 0.3s all;
    cursor: pointer;
    width: 100%;

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.15px;
      margin-left: 10px;
      color: $taskItemAddBtnColor;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
      background: #fff;
      border-radius: 3px;
    }
  }

  &__panel {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
  }
}
</style>
