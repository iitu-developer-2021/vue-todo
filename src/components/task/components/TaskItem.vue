<template>
  <component :is="tag" class="task-item">
    <router-link
      :to="to"
      class="task-item__link"
      exact-active-class="task-item__link--active"
      :class="{ 'task-item__link--deletable': deletable }"
    >
      <slot>
        <TaskColor class="task-item__color" :color="color" />
      </slot>
      <p class="task-item__text">{{ name }}</p>
      <button class="task-item__delete" @click.prevent="$emit('deleteTask')" v-if="!loading">
        <BaseSvgIcon name="only-close" width="12px" height="12px" />
      </button>
      <BaseLoader v-else inner width="15px" height="15px" />
    </router-link>
  </component>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { TaskItemColorKeys } from '../consts/taskItemColors'
import TaskColor from './TaskColor.vue'

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
    loading: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
  },
  components: {
    TaskColor,
  },
})
</script>
<style lang="scss" scoped>
.task-item {
  height: 40px;
  $self: &;

  &__link {
    text-decoration: none;
    border-radius: 4px;
    padding: 12px 12px;
    transition: 0.3s all;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;

    &:hover,
    &--active {
      background: $taskItemBackgroundColor;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    &--deletable:hover > #{$self}__delete {
      display: block;
    }
  }

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
}
</style>
