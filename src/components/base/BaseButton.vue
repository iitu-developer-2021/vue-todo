<template>
  <component :is="tag" v-bind="$attrs" class="button" :class="btnClasses" :style="btnStyles">
    <slot v-if="!loading" />
    <BaseLoader v-else width="30px" height="30px" inner />
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import BaseLoader from '@/components/base/BaseLoader.vue';

export default defineComponent({
  components: { BaseLoader },
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
      default: '40px',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnClasses() {
      const classes = [];
      if (this.buttonType === 'green') classes.push('button--green');
      if (this.buttonType === 'gray') classes.push('button--gray');
      if (this.loading) classes.push('button--loading');
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
  display: flex;
  justify-content: center;
  align-items: center;

  &--green {
    background: $buttonDefaultBackgroundColor;
    color: $buttonDefaultTextColor;

    &:hover {
      background: lighten($buttonDefaultBackgroundColor, 3%);
    }

    &:disabled {
      background: lighten($buttonDefaultBackgroundColor, 9%);
      cursor: not-allowed;
    }
  }

  &--gray {
    background: $buttonSecondaryBackgroundColor;
    color: $buttonSecondaryTextColor;

    &:hover {
      background: lighten($buttonSecondaryBackgroundColor, 3%);
    }

    &:disabled {
      background: lighten($buttonSecondaryBackgroundColor, 9%);
      cursor: not-allowed;
    }
  }

  &--loading {
    cursor: none;
    pointer-events: none;
  }
}
</style>
