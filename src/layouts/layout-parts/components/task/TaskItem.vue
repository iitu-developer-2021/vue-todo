<template>
  <component :is="tag" class="task-item" :class="{ 'task-item--deletable': deletable }">
    <slot>
      <TaskColor class="task-item__color" :color="color" />
    </slot>
    <p class="task-item__text">{{ name }}</p>
    <button class="task-item__delete" @click="$emit('deleteTask')">
      <BaseSvgIcon name="only-close" width="12px" height="12px" />
    </button>
  </component>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { TaskItemColorKeys } from '@/layouts/layout-parts/components/task/consts/taskItemColors';
import TaskColor from '@/layouts/layout-parts/components/task/TaskColor.vue';

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'li',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String as PropType<TaskItemColorKeys>,
      default: 'gray',
    },
    deletable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TaskColor,
  },
});
</script>
<style lang="scss" scoped>
.task-item {
  border-radius: 4px;
  padding: 12px 12px;
  transition: 0.3s all;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  &__color {
    width: 10px;
    height: 10px;
    border-radius: 20px;
  }

  &__text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.15px;
    color: $taskItemTextColor;
    margin-left: 10px;
    width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__delete {
    border: 0;
    outline: 0;
    background: transparent;
    position: absolute;
    right: 15px;
    top: 50%;
    cursor: pointer;
    width: 12px;
    height: 12px;
    transform: translateY(-50%);
    display: none;
    transition: 0.3s all;

    &:hover {
      transform: translateY(-50%) scale(1.4);
    }
  }

  &:hover {
    background: $taskItemBackgroundColor;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  &--deletable:hover > &__delete {
    display: block;
  }
}
</style>
