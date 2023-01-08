<template>
  <div :class="{ 'loader-global': !inner }">
    <BaseSvgIcon name="loader" v-bind="$attrs" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    inner: {
      type: Boolean,
      default: false,
    },
  },
  inheritAttrs: false,
})
</script>
<style lang="scss" scoped>
.loader-global {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
