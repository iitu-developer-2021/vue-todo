<template>
  <div class="add-item" v-if="canAdd">
    <button
      class="plus-btn"
      v-if="!localShowAddTaskFields"
      @click.prevent="onSetLocalShowAddTaskFields(true)"
    >
      <BaseSvgIcon name="plus" class="plus-btn__icon" />
      <span class="plus-btn__text">Новая задача</span>
    </button>
    <div class="add-field" v-show="localShowAddTaskFields">
      <BaseInput
        placeholder="Текст задачи"
        class="add-field__input"
        height="38px"
        :value="localModelValue"
        @input="setLocalModelValue($event.target.value)"
        @keydown.enter="setLocalModelValue($event.target.value)"
      ></BaseInput>
      <div class="add-field__actions">
        <BaseButton
          width="145px"
          height="34px"
          class="add-field__btn"
          @click.prevent="onAddTaskItem"
          :disabled="!localModelValue"
          :loading="addTaskLoading"
        >
          Добавить задачу
        </BaseButton>
        <BaseButton
          width="90px"
          height="34px"
          button-type="gray"
          class="add-field__btn"
          @click.prevent="onCancelAddTaskItem"
        >
          Отмена
        </BaseButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue'
import { useToggleState } from '@/composables/useToggleState'

export default defineComponent({
  emits: ['update:modelValue', 'update:showAddTaskFields', 'addTaskItem'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    showAddTaskFields: {
      type: Boolean,
      default: false,
    },
    addTaskLoading: {
      type: Boolean,
      default: false,
    },
    canAdd: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    //add task toggle state
    const { show: localShowAddTaskFields, setShow: setLocalShowAddTaskFields } =
      useToggleState()

    const onSetLocalShowAddTaskFields = (showState: boolean) => {
      setLocalShowAddTaskFields(showState)
      context.emit('update:showAddTaskFields', showState)
    }

    watchEffect(() => {
      setLocalShowAddTaskFields(props.showAddTaskFields)
    })

    // Input state two-way binding
    const localModelValue = ref(props.modelValue)
    const setLocalModelValue = (value: string) => {
      localModelValue.value = value
      context.emit('update:modelValue', value)
    }

    watchEffect(() => {
      localModelValue.value = props.modelValue
    })

    const onAddTaskItem = () => {
      context.emit('addTaskItem')
    }

    const onCancelAddTaskItem = () => {
      setLocalModelValue('')
      onSetLocalShowAddTaskFields(false)
    }

    return {
      localShowAddTaskFields,
      onSetLocalShowAddTaskFields,
      onAddTaskItem,
      onCancelAddTaskItem,
      localModelValue,
      setLocalModelValue,
    }
  },
})
</script>

<style lang="scss" scoped>
.plus-btn {
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  transition: 0.3s;
  margin: 20px 0;

  &:hover &__text {
    color: lighten(#b4b4b4, 5%);
  }

  &__icon {
    width: 18px;
    height: 18px;
    margin-right: 20px;
    margin-left: 4px;
  }

  &__text {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.15px;
    color: #b4b4b4;
  }
}

.add-field {
  &__actions {
    display: flex;
    margin-top: 16px;
  }

  &__btn:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
