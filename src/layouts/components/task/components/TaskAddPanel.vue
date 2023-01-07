<template>
  <div class="task-panel">
    <BaseInput
      :value="modelValue"
      @input="onUpdateModelValue($event.target.value)"
      placeholder="Название папки"
      class="task-panel__input"
    />

    <BaseSvgIcon name="close" class="task-panel__close" width="25px" height="25px" @click="$emit('closeAddPanel')" />

    <div class="task-panel__colors">
      <TaskColor
        v-for="(taskColorKey, index) in Object.keys(TASK_ITEM_COLORS)"
        :key="index"
        :color="taskColorKey"
        width="20px"
        height="20px"
        :is-active="localChosenColor === taskColorKey"
        @click="onUpdateCloseValue(taskColorKey)"
        is-cursor-pointer
      />
    </div>

    <BaseButton @click="$emit('addTask')" :disabled="!localChosenColor || !modelValue" :loading="addTaskLoading"
      >Добавить</BaseButton
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { TASK_ITEM_COLORS } from '@/layouts/components/task/consts/taskItemColors';
import TaskColor from '@/layouts/components/task/components/TaskColor.vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    chosenColor: {
      type: String,
      default: '',
    },
    addTaskLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'update:chosenColor', 'closeAddPanel'],
  setup(props, context) {
    const localChosenColor = ref('');
    const localModelValue = ref('');

    const onUpdateModelValue = (value: string) => {
      localModelValue.value = value;
      context.emit('update:modelValue', value);
    };

    const onUpdateCloseValue = (value: string) => {
      localChosenColor.value = value;
      context.emit('update:chosenColor', value);
    };

    watchEffect(() => {
      localChosenColor.value = props.chosenColor;
    });

    watchEffect(() => {
      localModelValue.value = props.modelValue;
    });

    return {
      TASK_ITEM_COLORS,
      localChosenColor,
      localModelValue,
      onUpdateModelValue,
      onUpdateCloseValue,
    };
  },
  components: {
    TaskColor,
  },
});
</script>
<style lang="scss" scoped>
.task-panel {
  background: #fff;
  padding: 18px;
  width: 260px;
  position: relative;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  &__close {
    position: absolute;
    top: -8px;
    right: -8px;
    cursor: pointer;
  }

  &__colors {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
  }
}
</style>
