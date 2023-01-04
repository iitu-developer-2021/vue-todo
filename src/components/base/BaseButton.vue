<template>
  <component :is="tag" v-bind="$attrs" class="button" :class="btnClasses">
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
  },
  computed: {
    btnClasses() {
      const classes = [];
      if (this.buttonType === 'green') classes.push('button--green');
      if (this.buttonType === 'gray') classes.push('button--gray');
      return classes;
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

  &--green {
    background: $buttonDefaultBackgroundColor;
    color: $buttonDefaultTextColor;
  }

  &--gray {
    background: $buttonSecondaryBackgroundColor;
    color: $buttonSecondaryTextColor;
  }
}
</style>
