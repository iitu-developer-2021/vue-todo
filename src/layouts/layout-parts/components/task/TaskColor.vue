<template>
  <div class="task-color" :style="taskColorStyle" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { TaskItemColorKeys } from '@/layouts/layout-parts/components/task/consts/taskItemColors';
import { TASK_ITEM_COLORS } from '@/layouts/layout-parts/components/task/consts/taskItemColors';

export default defineComponent({
  props: {
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
}
</style>
