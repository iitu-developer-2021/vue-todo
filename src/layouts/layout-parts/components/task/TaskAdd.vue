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
import { defineComponent, ref } from 'vue';
import { useToggleState } from '@/composables/useToggleState';
import { useTaskList } from '@/layouts/layout-parts/components/task/composables/useTaskList';
import { useOutsideClick } from '@/composables/useOutsideClick';
import TaskAddPanel from '@/layouts/layout-parts/components/task/TaskAddPanel.vue';
import type { Ref } from 'vue';

export default defineComponent({
  props: {
    text: {
      type: String,
      default: 'Добавить папку',
    },
  },
  setup() {
    const { show, setShowOn, setShowOff } = useToggleState();
    const { fetchAddTask, fetchAddTaskLoading, getDefaultTask } = useTaskList();

    const task = ref(getDefaultTask());
    const clearTask = () => (task.value = getDefaultTask());

    const onAddTask = async () => {
      await fetchAddTask({ ...task.value });
      clearTask();
    };

    const onCloseAddPanel = () => {
      setShowOff();
      clearTask();
    };

    const addPanelElement = ref<HTMLElement>();

    useOutsideClick(addPanelElement as Ref<HTMLElement>, () => {
      onCloseAddPanel();
    });

    return {
      show,
      task,
      setShowOn,
      onCloseAddPanel,
      onAddTask,
      fetchAddTaskLoading,
      addPanelElement,
    };
  },
  methods: {
    onOutsideClick() {
      console.log('called outside');
    },
  },
  components: {
    TaskAddPanel,
  },
});
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
