<template>
  <div class="base-input">
    <input
      type="text"
      v-bind="$attrs"
      class="base-input__element"
      :style="style"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'initial',
    },
  },
  setup(props) {
    const style = {
      width: props.width,
      height: props.height,
    }

    return {
      style,
    }
  },
})
</script>
<style lang="scss" scoped>
.base-input {
  &__element {
    border: 1px solid #efefef;
    border-radius: 4px;
    padding: 7px 11px;
    width: 100%;
    outline: none;

    &::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.15px;
      color: #c7c7c7;
    }

    &:focus {
      border: 1px solid #a6e2f6;
    }
  }
}
</style>
