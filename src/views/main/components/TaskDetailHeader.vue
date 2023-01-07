<template>
  <component :is="tag" class="task-header" :style="{ color: color }">
    <div class="task-header__wrapper" v-if="!editTitle">
      <p class="task-header__text">{{ text }}</p>
      <BaseSvgIcon name="pencil" class="task-header__icon" @click="setEditTitleOn" />
    </div>
    <input
      type="text"
      :value="newTaskTitle"
      @input="setNewTaskTitle($event.target.value)"
      v-show="editTitle"
      class="task-header__input"
      @keydown.enter="onSaveNewTitle"
      v-autofocus
      v-else
    />
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useToggleState } from '@/composables/useToggleState';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const newTaskTitle = ref(props.text);
    const setNewTaskTitle = (changedTaskTitle: string) => (newTaskTitle.value = changedTaskTitle);

    const { show: editTitle, setShowOff: setEditTitleOff, setShowOn: setEditTitleOn } = useToggleState();
    const onSaveNewTitle = () => {
      setEditTitleOff();
    };
    return {
      newTaskTitle,
      setNewTaskTitle,
      editTitle,
      setEditTitleOff,
      setEditTitleOn,
      onSaveNewTitle,
    };
  },
});
</script>
<style lang="scss" scoped>
.task-header {
  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__text {
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    margin-right: 10px;
  }

  &__icon {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  &__input {
    font-weight: 700;
    font-size: 31px;
    line-height: 39px;
    outline: none;
    border: none;
    background: transparent;
    width: max-content;
  }
}
</style>
