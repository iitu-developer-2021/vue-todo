<template>
  <div class="add-task">
    <button class="add-task__btn">
      <BaseSvgIcon name="plus" width="10px" height="10px" color="#868686" />
      <span>{{ text }}</span>
    </button>
    <TaskAddPanel class="add-task__panel" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TaskAddPanel from '@/layouts/layout-parts/components/task/TaskAddPanel.vue';

export default defineComponent({
  props: {
    text: {
      type: String,
      default: 'Добавить папку',
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
