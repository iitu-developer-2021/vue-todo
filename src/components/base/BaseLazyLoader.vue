<template>
  <div v-if="localShowLoader">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    delay: {
      type: Number,
      default: 500,
    },
  },
  setup(props) {
    const localShowLoader = ref(false);

    setTimeout(() => {
      localShowLoader.value = true;
    }, props.delay);

    return {
      localShowLoader,
    };
  },
});
</script>
