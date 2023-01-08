<template>
  <div
    :class="[wrapperClass, deletableClass]"
    tabindex="0"
    role="checkbox"
    :aria-checked="props.checked"
    @click="handleClick"
  >
    <div :class="iconClass">
      <BaseSvgIcon name="checkbox-initial" v-if="!props.checked" />
      <BaseSvgIcon name="checkbox-done" v-if="props.checked" />
    </div>
    <div :id="`label-${props.id}`" class="label">
      {{ props.label }}
    </div>
    <BaseSvgIcon
      name="only-close"
      class="check-box__close"
      @click.stop="handleDbClick"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits({
  onChange: {
    type: 'change',
  },
})

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  checked: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  deletable: {
    type: Boolean,
    default: true,
  },
})

const wrapperClass = computed(() => {
  const { checked } = props
  return {
    'check-box': true,
    'check-box--checked': checked,
  }
})

const iconClass = computed(() => {
  const { checked } = props
  return {
    'check-box__icon': true,
    'check-box__icon--checked': checked,
  }
})

const deletableClass = computed(() => {
  const { deletable } = props
  return {
    'check-box--deletable': deletable,
  }
})

const handleClick = () => {
  emit('onChange', props.id)
}

const handleDbClick = () => {
  emit('onDelete', props.id)
}
</script>
<style scoped lang="scss">
.check-box {
  align-items: flex-start;
  border: 1px solid transparent;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  user-select: none;
  position: relative;

  &:hover > &__close {
    display: block;
  }

  &__icon {
    display: block;

    svg {
      height: 22px;
      width: 22px;
      display: block;

      use {
        width: 100%;
        height: 100%;
      }
    }
  }

  &__close {
    position: absolute;
    top: 15px;
    right: 5px;
    width: 15px;
    height: 15px;
    display: none;
  }
}

.label {
  padding: 0 18px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000;
}
</style>
