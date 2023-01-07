<template>
  <component :is="tag" class="task-color" :style="taskColorStyle" :class="{ 'task-color--active': isActive }" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { TaskItemColorKeys } from '@/layouts/layout-parts/components/task/consts/taskItemColors';
import { TASK_ITEM_COLORS } from '@/layouts/layout-parts/components/task/consts/taskItemColors';

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    color: {
      type: String as PropType<TaskItemColorKeys>,
      default: 'gray',
    },
    width: {
      type: String,
      default: '10px',
    },
    height: {
      type: String,
      default: '10px',
    },
    isCursorPointer: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const taskColorStyle = {
      background: TASK_ITEM_COLORS[props.color],
      width: props.width,
      height: props.height,
      cursor: props.isCursorPointer ? 'pointer' : 'auto',
    };
    return {
      taskColorStyle,
    };
  },
});
</script>
<style lang="scss" scoped>
.task-color {
  width: 10px;
  height: 10px;
  border-radius: 20px;

  &--active {
    border: 2px solid #525252;
  }
}
</style>
