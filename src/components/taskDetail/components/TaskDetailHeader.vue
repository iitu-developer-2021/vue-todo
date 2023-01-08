<template>
  <component :is="tag" class="task-header" :style="{ color: color }">
    <div class="task-header__wrapper" v-if="!editTitle">
      <p class="task-header__text">{{ newTaskTextTitle }}</p>
      <BaseSvgIcon
        name="pencil"
        class="task-header__icon"
        @click="setEditTitleOn"
        v-if="canEdit && !loading"
      />
      <BaseLoader inner width="40px" height="40px" v-if="loading" />
    </div>
    <input
      type="text"
      :value="newTaskInputTitle"
      @input="setNewTaskInputTitle($event.target.value)"
      @keyup.enter="onSaveNewTitle"
      v-if="editTitle"
      class="task-header__input"
      :style="{ color: color }"
      v-autofocus
    />
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { useToggleState } from '@/composables/useToggleState'
import { watchEffect } from 'vue'

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
    canEdit: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['changeTitle'],
  setup(props, context) {
    const newTaskInputTitle = ref(props.text)
    const newTaskTextTitle = ref(props.text)

    const setNewTaskInputTitle = (changedTaskTitle: string) =>
      (newTaskInputTitle.value = changedTaskTitle)

    watchEffect(() => {
      newTaskInputTitle.value = props.text
      newTaskTextTitle.value = props.text
    })

    const {
      show: editTitle,
      setShowOff: setEditTitleOff,
      setShowOn: setEditTitleOn,
    } = useToggleState()

    const onSaveNewTitle = () => {
      context.emit('changeTitle', newTaskInputTitle.value)
      setEditTitleOff()
    }

    return {
      newTaskInputTitle,
      newTaskTextTitle,
      setNewTaskInputTitle,
      editTitle,
      setEditTitleOff,
      setEditTitleOn,
      onSaveNewTitle,
    }
  },
})
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
    max-width: 100%;
  }
}
</style>
