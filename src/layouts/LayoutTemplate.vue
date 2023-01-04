<template>
  <component :is="currentLayoutComponent">
    <template v-for="slotName in Object.keys($slots)" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { UseLayout } from './composables/useLayoutFactory';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    useLayout: {
      type: Function as PropType<UseLayout>,
      required: true,
    },
  },
  setup(props) {
    const { currentLayoutComponent } = props.useLayout();

    return { currentLayoutComponent };
  },
});
</script>
