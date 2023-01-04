<template>
  <component :is="tag" v-bind="$attrs" class="button" :class="btnClasses" :style="btnStyles">
    <slot />
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    buttonType: {
      type: String as PropType<'green' | 'gray'>,
      default: 'green',
      validators: (value: string) => {
        return ['green', 'gray'].includes(value);
      },
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'initial',
    },
  },
  computed: {
    btnClasses() {
      const classes = [];
      if (this.buttonType === 'green') classes.push('button--green');
      if (this.buttonType === 'gray') classes.push('button--gray');
      return classes;
    },
    btnStyles() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.15px;
  padding: 7px 10px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 0.3s all;

  &--green {
    background: $buttonDefaultBackgroundColor;
    color: $buttonDefaultTextColor;

    &:hover {
      background: lighten($buttonDefaultBackgroundColor, 3%);
    }
  }

  &--gray {
    background: $buttonSecondaryBackgroundColor;
    color: $buttonSecondaryTextColor;

    &:hover {
      background: lighten($buttonSecondaryBackgroundColor, 3%);
    }
  }
}
</style>
