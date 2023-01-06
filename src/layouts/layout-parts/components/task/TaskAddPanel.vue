<template>
  <div class="task-panel">
    <BaseInput
      placeholder="Название папки"
      class="task-panel__input"
      :value="taskName"
      @input="taskName = $event.target.value"
    />
    <BaseSvgIcon name="close" class="task-panel__close" width="25px" height="25px" />
    <div class="task-panel__colors">
      <TaskColor
        v-for="(taskColorKey, index) in Object.keys(TASK_ITEM_COLORS)"
        :key="index"
        :color="taskColorKey"
        width="20px"
        height="20px"
        is-cursor-pointer
      />
    </div>
    <BaseButton @click="onAddTask">Добавить</BaseButton>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { TASK_ITEM_COLORS } from '@/layouts/layout-parts/components/task/consts/taskItemColors';
import TaskColor from '@/layouts/layout-parts/components/task/TaskColor.vue';
import { useTaskList } from '@/layouts/layout-parts/components/task/composables/useTaskList';
import { getRandomUUID } from '@/layouts/helpers/generateRandomUID';
import { ref, unref } from 'vue';

export default defineComponent({
  setup() {
    const { addTask } = useTaskList();
    const taskName = ref('');

    const onAddTask = () => {
      addTask({
        id: getRandomUUID(),
        name: taskName.value,
        color: 'red',
      });
    };

    return {
      TASK_ITEM_COLORS,
      onAddTask,
      taskName,
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
