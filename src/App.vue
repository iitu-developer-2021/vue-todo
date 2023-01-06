<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component :is="Component" />
        <template #fallback>
          <div class="loader">
            <BaseSvgIcon name="loader" />
          </div>
        </template>
      </Suspense>
    </template>
  </router-view>
</template>
<script lang="ts"></script>
<style lang="scss">
.loader {
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
