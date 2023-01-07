<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component :is="Component" />
        <template #fallback>
          <BaseLazyLoader>
            <BaseLoader />
          </BaseLazyLoader>
        </template>
      </Suspense>
    </template>
  </router-view>
</template>
<script lang="ts"></script>
