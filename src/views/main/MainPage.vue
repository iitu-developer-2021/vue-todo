<template>
  <BaseLayout>
    <template #aside>
      <LayoutSidebar />
    </template>
    <template> Default main </template>
  </BaseLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BaseLayout, useBaseLayout } from '@/layouts/composables/useBaseLayout.js';
import LayoutSidebar from '@/layouts/components/LayoutSidebar.vue';

export default defineComponent({
  setup() {
    const { LAYOUTS, setLayout } = useBaseLayout();

    return {
      setLayout,
      LAYOUTS,
    };
  },
  components: {
    BaseLayout,
    LayoutSidebar,
  },
});
</script>
